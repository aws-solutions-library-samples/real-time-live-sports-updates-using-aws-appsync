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
const preprocessConfigTable = process.env.PREPROCESS_CONFIG_TABLE;
const apikey = process.env.GRAPHQL_APIKEY;
const targetWebsiteBucket = process.env.GAMESIMULATOR_WEBSITE_BUCKET;
const rootKeyForOriginBucket = process.env.GAMESIMULATOR_WEBSITE_ORIGIN_ROOT_KEY;
const originBucket = process.env.GAMESIMULATOR_WEBSITE_ORIGIN_BUCKET;
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3({
    region : process.env.AWS_REGION
});
const urlParse = require("url").URL;
const endpoint = new urlParse(url).hostname.toString();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
require('cross-fetch/polyfill');
const footballConfiguration = require('./footballConfiguration');
const soccerConfiguration = require('./soccerConfiguration');
const gamesConfiguration = require('./gamesConfiguration');
const cfn = require('./lib/cfn');
const fs = require('fs');

const createSimulatedSport = gql`
mutation PutSport (
    $input: CreateSportInput!
  ){
       createSport(input: $input) {
         id
         name
       }
     }
`;

const createSimulatedCompetition = gql`
mutation PutCompetition (
    $input: CreateCompetitionInput!
  ){
       createCompetition(input: $input) {
         id
         name
         type
         sportId
         sport {
          id
          name
        }
       }
     }
`;

const createSimulatedSeason = gql`
mutation PutSeason (
    $input: CreateSeasonInput!
  ){
       createSeason(input: $input) {
         id
         name
         startDate
         endDate
         competition {
            id
            name
            sport {
              id
              name
           }
         }
       }
     }
`;

const createSimulatedStage = gql`
mutation PutStage (
    $input: CreateStageInput!
  ){
       createStage(input: $input) {
        id
        name
        startDate
        endDate
        season {
          id
          name
          competition {
            id
            name
            sport {
              id
              name
            }
          }
        }
       }
     }
`;




exports.handler = async (event, context) => {
    console.log('received event: ');
    console.log(event);
    
    if (event.RequestType === 'Create') {
      console.log('CREATE!')
      
      var results = [];
      try {
          /* create simulated sport */
          var footballSport = await postGraphqlOperation(gamesConfiguration.footballSportInput, createSimulatedSport, "PutSport");
          var soccerSport = await postGraphqlOperation(gamesConfiguration.soccerSportInput, createSimulatedSport, "PutSport");
          
          /* create simulated FOOTBALL competition, season and stage */
          if(footballSport != null) {
            var footballCompetition = await postGraphqlOperation(gamesConfiguration.nflInput, createSimulatedCompetition, "PutCompetition");
            if(footballCompetition != null) {
              var footballSeason = await postGraphqlOperation(gamesConfiguration.nflRegularSeasonInput, createSimulatedSeason, "PutSeason");
              if(footballSeason != null) {
                var footballStage = await postGraphqlOperation(gamesConfiguration.nflStageInput, createSimulatedStage, "PutStage");
                results.push(footballStage);
              }
            }
          }
          
          /* create simulated SOCCER competitions, seasons and stages */
          if(soccerSport != null) {
            /* bundesgliga */
            var bundesligaCompetition = await postGraphqlOperation(gamesConfiguration.bundesligaInput, createSimulatedCompetition, "PutCompetition");
            if(bundesligaCompetition != null) {
              var bundesligaSeason = await postGraphqlOperation(gamesConfiguration.bundesligaSeasonInput, createSimulatedSeason, "PutSeason");
              if(bundesligaSeason != null) {
                var bundesligaStage = await postGraphqlOperation(gamesConfiguration.bundesligaStageInput, createSimulatedStage, "PutStage");
                results.push(bundesligaStage);
              }
            }
            
            /* serie a */
            var serieACompetition = await postGraphqlOperation(gamesConfiguration.serieAInput, createSimulatedCompetition, "PutCompetition");
            if(serieACompetition != null) {
              var serieASeason = await postGraphqlOperation(gamesConfiguration.serieASeasonInput, createSimulatedSeason, "PutSeason");
              if(serieASeason != null) {
                var serieAStage = await postGraphqlOperation(gamesConfiguration.serieAStageInput, createSimulatedStage, "PutStage");
                results.push(serieAStage);
              }
            }
          }
          
          /* preprocess function config DynamoDB Put*/
          var paramsFootballConfig = {
            TableName: preprocessConfigTable,
            Item: footballConfiguration.config
          };
          
          var paramsSoccerConfig = {
            TableName: preprocessConfigTable,
            Item: soccerConfiguration.config
          };
          await docClient.put(paramsFootballConfig).promise();
          await docClient.put(paramsSoccerConfig).promise();
          
          /* configure simulation webapp */
          await listAndCopyObjects(originBucket, rootKeyForOriginBucket,targetWebsiteBucket, null);
          
          
      } catch (err) {
        console.log('CATCH ERROR: ' + err);
        var signedResponse = await cfn.send(event, context, 'SUCCESS', { 'Message': 'Resource creation failed!' });
        console.log('SignedResponse is:');
        console.log(signedResponse);
      }
      
      
      var signedResponse = await cfn.send(event, context, 'SUCCESS', { 'Message': 'Resource creation completed!' });
      console.log(`RESPONSE:: ${JSON.stringify({ 'Message': 'Resource creation completed!' }, null, 2)}`);
      console.log(`CFN STATUS:: ${signedResponse}`);
    } else {
      console.log(event.RequestType);
      var signedResponse = await cfn.send(event, context, 'SUCCESS', { 'Message': 'Resource ' +  event.RequestType + ' completed!' });
      console.log(`RESPONSE:: ${JSON.stringify({ 'Message': 'Resource creation completed!' }, null, 2)}`);
      console.log(`CFN STATUS:: ${signedResponse}`);
      
    }
};



async function postGraphqlOperation(input,gql,operationName) {
  try {
    const req = new AWS.HttpRequest(url, region);
    req.method = "POST";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: print(gql),
        operationName: operationName,
        variables: {
        input: input
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
    console.log('items: ', graphqlData.data);
    return graphqlData.data;
  } catch (err) {
    console.log('error creating graphql operation : ', err);
    return null;
  } 
}


async function configureSimulationWebApp() {
  console.log('configureSimulationWebApp');
  await listAndCopyObjects(originBucket, rootKeyForOriginBucket,targetWebsiteBucket, null);
  console.log('completed configureSimulationWebApp');
}


// Send response to the pre-signed S3 URL
async function sendResponse (event, context, responseStatus, responseData) {
  console.log('Sending response ' + responseStatus);
  var responseBody = JSON.stringify({
    Status: responseStatus,
    Reason: 'See the details in CloudWatch Log Stream: ' + context.logStreamName,
    PhysicalResourceId: context.logStreamName,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: responseData
  });

  console.log('RESPONSE BODY:\n', responseBody);


  var parsedUrl = require('url').parse(event.ResponseURL);
  var options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.path,
    method: 'PUT',
    headers: {
      'content-type': '',
      'content-length': responseBody.length
    }
  };

  console.log('SENDING RESPONSE...\n');

  const signedResponse = await new Promise((resolve, reject) => {
        const httpRequest = https.request({options, host:parsedUrl.hostname.toString()  }, (result) => {
            result.on('data', (data) => {
                console.log(data.toString());
                resolve(data.toString());
            });
        });

        httpRequest.write(responseBody);
        httpRequest.end();
        
    });

  return signedResponse;
}

async function listAndCopyObjects(sourceBucket,sourcePrefix,targetBucket,continuationToken) {
    console.log('listAndCopyObjects: ' + sourceBucket +  ',' + sourcePrefix +  ',' + targetBucket + ',' + continuationToken);
    var originPrefix = sourcePrefix + '/webapp/';

    try {
      // read contents of  websiteFiles
      const dataLines = fs.readFileSync('./websiteFiles.txt', 'UTF-8');
      // split the contents by new line
      const lines = dataLines.split(/\r?\n/);
  
      for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          console.log('line is: ');
          console.log(line);
          var item = line.substring(line.indexOf('/webapp/') + 8);
          if(item.indexOf('.') != -1) {
            var originKey = originPrefix + item;
            console.log('originKey: ' + originKey);
            var destinationKey = originKey.replace(originPrefix,'');
            console.log('destinationKey: ' + destinationKey);
            if(destinationKey.indexOf('static/js/main.') != -1) {
                await uploadMainJsFile(sourceBucket, originKey, targetBucket,destinationKey);
            } else {
                await copyObject(sourceBucket,originKey,targetBucket,destinationKey);
            }
          }
      }

  } catch (err) {
      console.error(err);
  }


}


async function uploadMainJsFile(sourceBucket, originKey, targetBucket,destinationKey) {
  console.log('uploadMainJsFile');
  let params = {
      Bucket: sourceBucket,
      Key: originKey
  };
  
  var objectData = await s3.getObject(params).promise();
  if(objectData.error) {
      console.error('RECEIVED ERROR in copyObject: ' + objectData.error);
  } else {
       let originalBody = objectData.Body.toString();
       let modifiedBody = originalBody.replace(/##REGION_PLACEHOLDER##/g, region).replace(/##GRAPHQL_ENDPOINT_PLACEHOLDER##/g,url).replace(/##API_KEY_PLACEHOLDER##/g,apikey);
       console.log('modifiedBody');
       console.log(modifiedBody);
       var putParams = {
          Body: modifiedBody, 
          Bucket: targetBucket, 
          Key: destinationKey
       }
       
       var putData = await s3.putObject(putParams).promise();
       if(putData.error) {
           console.log('ERROR in copying main.js file');
           console.log(putData.error);
       } else {
           console.log('COPIED modified main.js file');
       }
  }
}


async function copyObject(sourceBucket,originKey,targetBucket,destinationKey) {
  console.log('copyObject');
  var copyParams = {
    Bucket: targetBucket, 
    CopySource: encodeURIComponent(sourceBucket + '/' + originKey),
    Key: destinationKey,
    MetadataDirective: 'COPY'
  };

 console.log('should start copy object with params: ');
 console.log(copyParams);
 let copyData = await s3.copyObject(copyParams).promise();
 if(copyData.error) {
     console.error('RECEIVED ERROR in copyObject: ' + copyData.error);
 } else {
     console.log('Copied object: ' + copyParams.Key);
 }
 
}