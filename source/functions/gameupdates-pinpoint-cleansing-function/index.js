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
 
const REMOVE_EVENT_NAME = "REMOVE";
const AWS = require('aws-sdk');
const pinpoint = new AWS.Pinpoint();
const pinpointAppID = process.env.PINPOINT_APPLICATION_ID;

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    for (const record of event.Records) {
        console.log(record.eventID);
        console.log(record.eventName);
        console.log('DynamoDB Record: %j', record.dynamodb);
        var unmarshalled = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
        if(record.eventName === REMOVE_EVENT_NAME) {
            var deleteCampaignResult = await pinpoint.deleteCampaign({
              ApplicationId: pinpointAppID, /* required */
              CampaignId: unmarshalled.metadata.campaign.Id /* required */
            }).promise();
            console.log('deleted campagin with result: ');
            console.log(deleteCampaignResult);
            var deleteSegmentResult = await pinpoint.deleteSegment({
              ApplicationId: pinpointAppID, /* required */
              SegmentId: unmarshalled.metadata.segmentId /* required */
            }).promise();
            console.log('deleted segment with result: ');
            console.log(deleteSegmentResult);
        } 
    }
    return `Successfully processed ${event.Records.length} records.`;
};
