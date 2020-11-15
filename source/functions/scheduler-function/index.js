/********************************************************************************************************************* 
 *  Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.                                           * 
 *                                                                                                                    * 
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance    * 
 *  with the License. A copy of the License is located at                                                             * 
 *                                                                                                                    * 
 *      http://www.apache.org/licenses/LICENSE-2.0                                                                    * 
 *                                                                                                                    * 
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES * 
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions    * 
 *  and limitations under the License.                                                                                * 
 *********************************************************************************************************************/

/****************************
 * @author Stefano Sandrini *
 ****************************/

const https = require('https');
const url = process.env.API_REALTIMESPORTSCLIENT_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();
const urlParse = require("url").URL;
const endpoint = new urlParse(url).hostname.toString();
//const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
require('cross-fetch/polyfill');

const listTodaysGames = gql`
  query ListGames($filter: ModelGameFilterInput) {
	listGames(filter:$filter) {
    items {
      id
      plannedKickoffTime
      feedConfig {
        providerId
        feedId
        url
      }
      stage {
        id
        name
        feedConfig {
          providerId
          feedId
          url
        }
        season {
          id
          name
          feedConfig {
            providerId
            feedId
            url
          }
          competition {
            id
            name
            feedConfig {
              providerId
              feedId
              url
            }
            sportId
          }
        }
      }
    }
  }       
}
`;

exports.handler = async (event) => {
    var results = [];
    var games = await getGames();
    await Promise.all(
       games.map(async(game) => {
          const stateMachineArn = process.env.STATEMACHINE_ARN;
          var feedForGame = await getFeedForGame(game);
          game.url = feedForGame.url;
          game.providerId = feedForGame.providerId;
          game.feedId = feedForGame.feedId;
          if(game.url != null && game.url != '') {
            const result = await stepfunctions.startExecution({
                stateMachineArn,
                input: JSON.stringify({
                    planned_game_start: game.plannedKickoffTime, 
                    game: game
                }),
            }).promise();
            console.log(`State machine ${stateMachineArn} executed successfully`, result);
            results.push(result);  
          }
      })
    )
    return {
      results: results
    };
}


async function getGames() {
  var today = new Date();
  var todayString = today.toISOString().slice(0,10);
  try {
    const req = new AWS.HttpRequest(url, region);
    req.method = "POST";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: print(listTodaysGames),
        operationName: "ListGames",
        variables: {
        filter: {
          plannedKickoffTime: {
            beginsWith: todayString
          }
        }
      }
    });
    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
    
    const graphqlData = await new Promise((resolve, reject) => {
        const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
            result.on('data', (data) => {
                resolve(JSON.parse(data.toString()));
            });
        });

        httpRequest.write(req.body);
        httpRequest.end();
    });
    
    console.log('received graphqlData: ');
    console.log(JSON.stringify(graphqlData));
    console.log('received graphql errors: ', graphqlData.errors);
    console.log('items: ', graphqlData.data.listGames.items);
    const body = {
      message: "successfully created gameEvent!"
    }
    return graphqlData.data.listGames.items;
  } catch (err) {
    console.log('error creating todo: ', err);
    return [];
  } 
}


async function getFeedForGame(game) {
  var feed =  {};
  console.log('getting Feed for the game:');
  console.log(game);
  if(game.feedConfig != null) {
      feed.url = game.feedConfig.url;
      feed.providerId = game.feedConfig.providerId;
      feed.feedId = game.feedConfig.feedId;
  }
  /* --- Check game url ---*/
  if(feed.url == null) {
    if(game.stage.feedConfig != null && game.stage.feedConfig.url != null) {
      feed.url = game.stage.feedConfig.url;
    } else if(game.stage.season.feedConfig != null && game.stage.season.feedConfig.url != null) {
      feed.url = game.stage.season.feedConfig.url;
    } else if(game.stage.season.competition.feedConfig != null && game.stage.season.competition.feedConfig.url != null) { 
      feed.url = game.stage.season.competition.feedConfig.url;
    }
  }
  /* --- Check game providerId ---*/
  if(feed.providerId == null) {
    if(game.stage.feedConfig != null && game.stage.feedConfig.providerId != null) {
      feed.providerId = game.stage.feedConfig.providerId;
    } else if(game.stage.season.feedConfig != null && game.stage.season.feedConfig.providerId != null) {
      feed.providerId = game.stage.season.feedConfig.providerId;
    } else if(game.stage.season.competition.feedConfig != null && game.stage.season.competition.feedConfig.providerId != null) { 
      feed.providerId = game.stage.season.competition.feedConfig.providerId;
    }
  }
  /* --- Check game feedId ---*/
  if(feed.feedId == null) {
    if(game.stage.feedConfig != null && game.stage.feedConfig.feedId != null) {
      feed.feedId = game.stage.feedConfig.feedId;
    } else if(game.stage.season.feedConfig != null && game.stage.season.feedConfig.feedId != null) {
      feed.feedId = game.stage.season.feedConfig.feedId;
    } else if(game.stage.season.competition.feedConfig != null && game.stage.season.competition.feedConfig.feedId != null) { 
      feed.feedId = game.stage.season.competition.feedConfig.feedId;
    }
  }
  
  return feed;
  
}