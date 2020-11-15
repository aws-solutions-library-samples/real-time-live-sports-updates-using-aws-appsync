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
const stateMachineArn = process.env.STATEMACHINE_ARN;
const url = process.env.API_REALTIMESPORTSCLIENT_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();
const urlParse = require("url").URL;
const endpoint = new urlParse(url).hostname.toString();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
require('cross-fetch/polyfill');

const createSimulatedGame = gql`
mutation CreateGame(
    $input: CreateGameInput!
  ) {
    createGame(input: $input) {
      id
      stage {
        id
        startDate
        endDate
        name
        sequence
        season {
          id
          name
          year
          competitionId
          startDate
          endDate
          status
          createdAt
          updatedAt
        }
        seasonId
      }
      stageId
      plannedKickoffTime
      venue {
        id
        name
        capacity
        city
        country
        surface
        roofType
      }
      home {
        id
        name
        country
        countryCode
        alias
      }
      away {
        id
        name
        country
        countryCode
        alias
      }
      createdAt
      updatedAt
    }
  }
`;


exports.handler = async (event) => {
    var results = [];
    const allGames = require('./games');
    var games = allGames.allGames;
    await Promise.all(
       games.map(async(game) => {
          console.log('game from games is');
          console.log(game);
          game.plannedKickoffTime = getGameKickoff(game);
          game.id += ('' + (new Date().getTime()));
          const createdGameId = await createGame(game);
          if(createdGameId != null) {
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


function getGameKickoff(game) {
  var today = new Date();
  const minutesToKickOff = 2; // let's start the simulated game 5 minutes from now.
  var kickoff = new Date(today.getTime() + minutesToKickOff*60000);
  return  kickoff.toISOString()
}

async function createGame(game) {
  try {
    const req = new AWS.HttpRequest(url, region);
    req.method = "POST";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: print(createSimulatedGame),
        operationName: "CreateGame",
        variables: {
        input: game
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
    console.log('received graphql errors: ', graphqlData.errors);
    console.log('items: ', graphqlData.data.createGame.id);
    return graphqlData.data.createGame.id;
  } catch (err) {
    console.log('error creating todo: ', err);
    return null;
  } 
}


async function getFeedForGame(game) {
  var feed =  {};
  console.log('getting Feed for the game:');
  console.log(game);
  if(game.feedConfig != null) {
      feed.providerId = game.feedConfig.providerId;
      feed.feedId = game.feedConfig.feedId;
  }
  
  return feed;
  
}