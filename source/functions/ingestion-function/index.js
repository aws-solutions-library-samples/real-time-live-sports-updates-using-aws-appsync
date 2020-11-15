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
 

const axios = require('axios');
const providerBaseURL = 'https://api.sportradar.us';
const streamName = process.env.REALTIMELIVESPORTSUPDATE_KINESISSTREAM_NAME; 
const AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis({
    region: process.env.REGION
});


exports.handler = async (event) => {
    
    console.log('INGESTION FUNCTION GOT EVENT: ');
    console.log(JSON.stringify(event,null,2));
    
    var sportsURL = event.url;
    var sportsData = {};
    var finalStatus = "live";
    try {
        sportsData = await axios({
            url: sportsURL,
            method: 'get',
        });   
        console.log('received data for url: ' + sportsURL);
        console.log(JSON.stringify(sportsData.data, null, 2));
    } catch (error) {
        console.log('ERROR in calling Sports provider');
        console.log(error);
        console.log('reading fake data');
        const liveResultsExample = require('live_results_example.json');
        sportsData.data = liveResultsExample;
    }
    
    if(sportsData.data.results) {
        await Promise.all(
        sportsData.data.results.map(async(result) => {
            console.log('Sending data to kinesis stream: ' + streamName);
            result.providerId = event.providerId || providerBaseURL;
            result.feedId = event.feedId || sportsURL;
            const data = await kinesis.putRecord({
                Data: JSON.stringify(result),
                PartitionKey: sportsURL,
                StreamName: streamName
            }).promise();
            
            console.log('KINESIS PUT RECORD DATA IS: ');
            console.log(JSON.stringify(data,null,2));

        })
      );    
    } else if(sportsData.data) {
        console.log('Sending data to kinesis stream: ' + streamName);
        sportsData.data.providerId = event.providerId || providerBaseURL;
        sportsData.data.feedId = event.feedId || sportsURL;
        const data = await kinesis.putRecord({
            Data: JSON.stringify(sportsData.data),
            PartitionKey: sportsURL,
            StreamName: streamName
        }).promise();
        
        console.log('KINESIS PUT RECORD DATA IS: ');
        console.log(JSON.stringify(data,null,2));
        try {
            console.log('returning final status: ', sportsData.data.sport_event_status.status)
            finalStatus = sportsData.data.sport_event_status.status;
        } catch (e) {
            console.log('unable to check final status');
        }
    }
    
    //const response = finalStatus;
      
    return finalStatus;
};
