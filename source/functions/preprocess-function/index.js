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
const urlParse = require("url").URL;
const endpoint = new urlParse(url).hostname.toString();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { transform } = require("node-json-transform");
const _ = require('lodash');
const { print } = graphql;
require('cross-fetch/polyfill');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


var storagePreprocessConfigName = process.env.STORAGE_PREPROCESSCONFIG_NAME;

const createGameEvent = gql`
  mutation CreateGameEvent(
    $input: CreateGameEventInput!
    $condition: ModelGameEventConditionInput
  ) {
    createGameEvent(input: $input, condition: $condition) {
      id
      gameId
      game {
        id
        stage {
          id
          startDate
          endDate
          name
          sequence
        }
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
        gameStatus {
          status
          clock
          clockStoppageAnnounced
          clockStoppagePlayer
          aggregateAwayScore
          aggregateHomeScore
          awayNormaltimeScore
          awayOvertimeScore
          awayScore
          homeNormaltimeScore
          homeOvertimeScore
          homeScore
          possession
          location
          play
          sections {
            awayScore
            homeScore
            sequence
            name
            type
            stats
          }
        }
        scoringDrives {
          scoreName
          score
          playsCount
          duration
          quarter
          gain
          penalty
        }
        stats
      }
      type
      clock
      section {
        awayScore
        homeScore
        sequence
        name
        type
        stats
      }
      competitor {
        id
        name
        country
        countryCode
        alias
      }
      homeScore
      awayScore
      scorer {
        id
        name
        jersey
        position
        country
        countryCode
      }
      assist {
        id
        name
        jersey
        position
        country
        countryCode
      }
      playerIn {
        id
        name
        jersey
        position
        country
        countryCode
      }
      playerOut {
        id
        name
        jersey
        position
        country
        countryCode
      }
      commentary
      players {
        id
        name
        jersey
        position
        country
        countryCode
      }
      createdAt
    }
  }
`;

const updateGame = gql`
mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
        games {
          nextToken
        }
        createdAt
        updatedAt
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
      gameStatus {
        status
        clock
        clockStoppageAnnounced
        clockStoppagePlayer
        winner {
          id
          name
          country
          countryCode
          alias
        }
        aggregateAwayScore
        aggregateHomeScore
        aggregateWinner {
          id
          name
          country
          countryCode
          alias
        }
        awayNormaltimeScore
        awayOvertimeScore
        awayScore
        homeNormaltimeScore
        homeOvertimeScore
        homeScore
        possession
        location
        play
        sections {
          awayScore
          homeScore
          sequence
          name
          type
          stats
        }
      }
      scoringDrives {
        scoreName
        score
        playsCount
        duration
        quarter
        gain
        penalty
        team {
          id
          name
          country
          countryCode
          alias
        }
      }
      stats
      createdAt
      updatedAt
    }
  }
`;


exports.handler = async (event) => {
  console.log('Preprocess function received event: ');
  console.log(event);
  try {
    event = JSON.parse(event);
  } catch (e) {
      console.log("EVENT is not JSON string ");
  }
  try {
    await Promise.all(
      event.Records.map(async(record) => {
        var payload = Buffer.from(record.kinesis.data, 'base64').toString();
        var processedRecord = await processRecord(JSON.parse(payload));
        if(processedRecord.UpdateGameInput != null && processedRecord.UpdateGameInput.id != null) {
          await postGame(processedRecord.UpdateGameInput)
        }
        if(processedRecord.CreateGameEventInput != null && processedRecord.CreateGameEventInput.id != null && processedRecord.CreateGameEventInput.gameId) {
          await postGameEvent(processedRecord.CreateGameEventInput);  
        }
        
      })
    )
  } catch(e) {
    console.log('error catched: ');
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify({
        payload: e
      }),
      headers: {
          "Access-Control-Allow-Origin": "*",
      }
    }
  }
}

const processRecord = async function (record) {
  console.log('processRecord starts');
  console.log('record is: ', record);
  console.log('found provier id: ' + record.providerId);
  console.log('found feed id: ' + record.feedId);
  var providerId = record.providerId || process.env.DEFAULT_PROVIDER_ID;
  var feedId = record.feedId || process.env.DEFAULT_FEED_ID;
  
  var data = await loadConfig(providerId, feedId);
  if(data && data.Items && data.Items.length == 1) {
      return new Promise((resolve, reject) => {
          try {
            var transformConfig = data.Items[0].transform;
            console.log('transform is : ' + typeof transformConfig);
            console.log(transformConfig);
            var result = transform(record, data.Items[0].transform);
            console.log('RESULT ');
            //console.log(JSON.stringify(result, null, 2));
            console.log(result);
            var sanitizedRecord = sanitizeRecord(result, data.Items[0]);
            console.log('SANITIZED RECORD: ');
            console.log(JSON.stringify(sanitizedRecord, null, 2));
            var filteredOnRequirements = filterOnRequiredRecord(sanitizedRecord, data.Items[0]);
            console.log('FILTERED RECORD: ');
            console.log(JSON.stringify(filteredOnRequirements, null, 2));
            resolve(filteredOnRequirements);  
          } catch (err) {
              console.log('err', err);
              reject(err);
          }
          
          /*jsonMapper(record, data.Items[0].mapping ).then((result) => {
            console.log('RESULT ');
            console.log(JSON.stringify(result, null, 2));
              resolve(result);
            }, (err) => {
              console.log('err', err);
              reject(err);
            });
            */
      }); 
  } else {
    return new Promise((resolve, reject) => {
        console.log('NO Conifg found for providerId and feedId, returning record as it is');
        resolve(record);
      }) 
  }
}

 async function loadConfig(providerId, feedId = '') {
  if(providerId !== '') {
    var params = {
      TableName: storagePreprocessConfigName
    };
  
    params.KeyConditionExpression = feedId != '' ? 'providerId =:hkey AND feedId =:rkey' : 'providerId =:hkey';
    params.ExpressionAttributeValues = {
        ':hkey': providerId
    };
    if(feedId != '') {
      params.ExpressionAttributeValues[':rkey'] =  feedId;
    }

    console.log('LOADING CONFIG, querying with params');
    console.log(params);
    try {
      const data = await dynamoDb.query(params).promise();
      return data;
    } catch (error) {
      console.log('got error in retrieving config:', error);
      return null;
    }
    
  }
}

async function postGameEvent(processedRecord) {
  console.log('postGameEvent');
  console.log(processedRecord);
  try {
    
    const req = new AWS.HttpRequest(url, region);
    req.method = "POST";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: print(createGameEvent),
        operationName: "CreateGameEvent",
        variables: {
          input: processedRecord
        }
    });
    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
    
    const graphqlData = await new Promise((resolve, reject) => {
        const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
            result.on('data', (data) => {
                console.log('receiving data from AppSync:');
                resolve(JSON.parse(data.toString()));
            });
        });

        httpRequest.write(req.body);
        httpRequest.end();
    });
    
    console.log('posted graphql data: ', graphqlData.data);
    console.log('posted graphql errors: ', graphqlData.errors);
    const body = {
      message: "successfully created gameEvent!"
    }
    
    return body;
  } catch (err) {
    console.log('error creating gameEvent: ', err);
  } 
}

async function postGame(processedRecord) {
  console.log('postGame');
  console.log(JSON.stringify(processedRecord, null, 2));
  try {
    
    const req = new AWS.HttpRequest(url, region);
    req.method = "POST";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: print(updateGame),
        operationName: "UpdateGame",
        variables: {
          input: processedRecord
        }
    },null,2);
    console.log('req.body is');
    console.log(req.body);
    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
    
    const graphqlData = await new Promise((resolve, reject) => {
        const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
            result.on('data', (data) => {
                console.log('receiving data from AppSync:');
                resolve(JSON.parse(data.toString()));
            });
        });

        httpRequest.write(req.body);
        httpRequest.end();
    });
    
    console.log('posted graphql data: ', graphqlData.data);
    console.log('posted graphql errors: ', graphqlData.errors);
    const body = {
      message: "successfully created gameEvent!"
    }
    
    return body;
  } catch (err) {
    console.log('error creating gameEvent: ', err);
  } 
}

function sanitizeRecord(record, providerConfig) {
  var filtered = _.pickBy(record, function (value,key) { 
      if(!_.isPlainObject(value)) {
          return value !== '' && value !== null && value !== undefined
        } else if(_.isEmpty(value)) {
          return false;
        } else {
          var preSanitized = sanitizeRecord(value, providerConfig);
          return !_.isEmpty(preSanitized); 
        }
  });
  return _.cloneDeepWith(filtered, function (v,k) { 
    //return v !== filtered && _.isPlainObject(v) ? sanitizeRecord(v, providerConfig) : undefined; 
    if(v !== filtered && _.isPlainObject(v)) {
      if(providerConfig.mapping[k]!=null && providerConfig.mapping[k].type=='AWSJSON') {
        return JSON.stringify(v);
      } else {
        return sanitizeRecord(v, providerConfig);
      }
    } else {
      return undefined;
    }
  });
};

function filterOnRequiredRecord(record, providerConfig) {
  if(providerConfig.required != null && !_.isEmpty(providerConfig.required)) {
    /* let's filter */
    var rootPropertiesToRemove = [];
    _.forEach(providerConfig.required, function(path) {
      if(!_.has(record, path)) {
        rootPropertiesToRemove.push(path.split('.')[0]);
      }
    });
    /* returning record omitting rootProperties that don't satisfy requirements */
    return _.omit(record, rootPropertiesToRemove);
    
  } else {
    /* no required config, return as it is */
    return record;
  }
}