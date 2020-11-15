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
 
const INSERT_EVENT_TYPE = "INSERT";
const MODIFY_EVENT_TYPE = "MODIFY";
const notificationConfig = require('./config');
const pinpointAppID = process.env.PINPOINT_APPLICATION_ID;
const pinpointConfigTable = process.env.PINPOINT_CONFIG_TABLE;
const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.AWS_REGION
});
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const pinpoint = new AWS.Pinpoint();

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    for (const record of event.Records) {
        console.log(record.eventID);
        console.log(record.eventName);
        console.log('DynamoDB Record: %j', record.dynamodb);
        var unmarshalledNewImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
        if(record.eventName == MODIFY_EVENT_TYPE) {
            var unmarshalledOldImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
            var results = await handleGameModify(unmarshalledNewImage, unmarshalledOldImage, record.eventID);
            if(results != null) {
                await savePinpointMetadata(results);    
            }
        }
    }
    return `Successfully processed ${event.Records.length} records.`;
};

async function handleGameInsert(unmarshalledNewImage, eventID) {
    console.log('new game event detected, checking config for event to notify');
    console.log('unmarshalled is: ');
    console.log(unmarshalledNewImage);
    if(unmarshalledNewImage.type != null && notificationConfig.allowedEvents.indexOf(unmarshalledNewImage.type) != -1) {
        console.log('event will be notified');
        var segmentId = await createSegment(unmarshalledNewImage, eventID);
        console.log('creating campaing');
        var createCampaignResult = await pinpoint.createCampaign({
            ApplicationId: pinpointAppID,
            WriteCampaignRequest: {
                Schedule: {
                    StartTime: "IMMEDIATE"
                },
                Name: "GameEvent#" + eventID + '#' + unmarshalledNewImage.id,
                SegmentId: segmentId,
                MessageConfiguration: {
                    DefaultMessage: {
                        Action: "OPEN_APP",
                        Body: "" + unmarshalledNewImage.awayScore + '-' + unmarshalledNewImage.homeScore + ' ' + unmarshalledNewImage.commentary,
                        Title: "away@home"
                    }
                }
            }
        }).promise();
        console.log('created campaign');
        console.log(createCampaignResult);  
        return {
            segmentId: segmentId,
            campaign: createCampaignResult.data.CampaignResponse
        } 
    } else {
        return null;
    }
};

async function handleGameModify(unmarshalledNewImage,unmarshalledOldImage, eventID) {
    if(unmarshalledNewImage.gameStatus != null && unmarshalledNewImage.gameStatus.status === 'STARTED' && (unmarshalledOldImage.gameStatus == null || unmarshalledNewImage.gameStatus.status !== unmarshalledOldImage.gameStatus.status )) {
        return await createGameStartedCampaign(unmarshalledNewImage, eventID);
    }
    if(unmarshalledNewImage.gameStatus.status !== 'STARTED' && (unmarshalledOldImage.gameStatus == null || unmarshalledNewImage.gameStatus.status !== unmarshalledOldImage.gameStatus.status)) {
        return await createGameStatusChangedCampaign(unmarshalledNewImage, eventID);
    }
    if((unmarshalledNewImage.gameStatus != null && unmarshalledOldImage.gameStatus != null) && (unmarshalledNewImage.gameStatus.awayScore !== unmarshalledOldImage.gameStatus.awayScore || unmarshalledNewImage.gameStatus.homeScore !== unmarshalledOldImage.gameStatus.homeScore)) {
        return await createGameScoreChangedCampaign(unmarshalledNewImage, eventID);
    }
    return null;
}

async function createGameStartedCampaign(unmarshalled, eventID) {
    console.log('createGameStartedCampaign will be notified');
    var segmentId = await createSegment(unmarshalled);
    console.log('creating campaing');
    var createCampaignResult = await pinpoint.createCampaign({
        ApplicationId: pinpointAppID,
        WriteCampaignRequest: {
            Schedule: {
                StartTime: "IMMEDIATE"
            },
            Name:"Game#" + unmarshalled.id + '#STARTED',
            SegmentId: segmentId,
            MessageConfiguration: {
                DefaultMessage: {
                    Action: "OPEN_APP",
                    Body: "Game started",
                    Title: unmarshalled.dynamodb.NewImage.away.name + " @" + unmarshalled.dynamodb.NewImage.home.name
                }
            }
        }
    }).promise();
    console.log('created campaign');
    console.log(createCampaignResult);  
    return {
        segmentId: segmentId,
        campaign: createCampaignResult.CampaignResponse
    } 
}


async function createGameStatusChangedCampaign(unmarshalled, eventID) {
    console.log('createGameStatusChangedCampaign will be notified');
    var segmentId = await createSegment(unmarshalled, eventID);
    var campaignName = "Game#" + unmarshalled.id + '#STATUS';
    console.log('creating campaing: ' + campaignName);
    var createCampaignResult = await pinpoint.createCampaign({
        ApplicationId: pinpointAppID,
        WriteCampaignRequest: {
            Schedule: {
                StartTime: "IMMEDIATE"
            },
            Name:campaignName,
            SegmentId: segmentId,
            MessageConfiguration: {
                DefaultMessage: {
                    Action: "OPEN_APP",
                    Body: "Game " + unmarshalled.gameStatus.status,
                    Title: unmarshalled.away.name + " @" + unmarshalled.home.name
                }
            }
        }
    }).promise();
    console.log('created campaign');
    console.log(createCampaignResult);  
    return {
        segmentId: segmentId,
        campaign: createCampaignResult.CampaignResponse
    } 
}

async function createGameScoreChangedCampaign(unmarshalled, eventID) {
    console.log('createGameScoreChangedCampaign will be notified');
    var segmentId = await createSegment(unmarshalled);
    var campaignName = "Game#" + unmarshalled.id + '#SCORE';
    console.log('creating campaing with name: ' + campaignName);
    var createCampaignResult = await pinpoint.createCampaign({
        ApplicationId: pinpointAppID,
        WriteCampaignRequest: {
            Schedule: {
                StartTime: "IMMEDIATE"
            },
            Name: campaignName,
            SegmentId: segmentId,
            MessageConfiguration: {
                DefaultMessage: {
                    Action: "OPEN_APP",
                    Body: "Score: " + unmarshalled.gameStatus.awayScore + " - " + unmarshalled.gameStatus.homeScore ,
                    Title: unmarshalled.away.name + " @ " + unmarshalled.home.name
                }
            }
        }
    }).promise();
    console.log('created campaign');
    console.log(createCampaignResult);  
    return {
        segmentId: segmentId,
        campaign: createCampaignResult.CampaignResponse
    } 
}

async function createSegment(unmarshalled, eventID) {
    console.log('creating segment');
    var createSegmentResult = await pinpoint.createSegment({
        ApplicationId: pinpointAppID,
        WriteSegmentRequest: {
            Name:"Game#" + unmarshalled.id + '#' + eventID,
            Dimensions: {
                Attributes: {
                    'Team': {
                        Values: [unmarshalled.home.id, unmarshalled.away.id],
                        AttributeType: "INCLUSIVE"
                    } 
                }
            }
        }
    }).promise();
    console.log(createSegmentResult);
    return createSegmentResult.SegmentResponse.Id;
}

async function savePinpointMetadata(metadata) {
    const now = new Date();
    const secondsSinceEpoch = Math.round(now.getTime() / 1000);
    const ttl = (60 * 5) + secondsSinceEpoch;
    var params = {
      TableName: pinpointConfigTable,
      Item: {
         id: metadata.campaign.Id,
         metadata: metadata,
         ttl: ttl
      }
    };
    try {
      const data = await dynamoDb.put(params).promise();
      return data;
    } catch (error) {
      console.log('got error in saving config:', error);
      return null;
    }
}