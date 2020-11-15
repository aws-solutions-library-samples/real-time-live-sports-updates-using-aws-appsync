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
 
const streamName = process.env.REALTIMELIVESPORTSUPDATE_KINESISSTREAM_NAME; 
const AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis({
    region: process.env.REGION
});
const COMPLETED_STATUS = "completed";


exports.handler = async (event, context, callback) => {
    
    console.log('SIMULATION FUNCTION GOT EVENT: ');
    console.log(JSON.stringify(event,null,2));
    
    var sportsURL = event.game.url;
    var simulatedGameId = event.game.id.split('-')[0];
    var simulatedGameLastEventIndex = event.status != null ? event.status : -1;
    var finalStatus = "live";
    var sportsData = require('./' + simulatedGameId);
    
    console.log('simulatedGameLastEventIndex received: ' + simulatedGameLastEventIndex);
    
    if(sportsData.events) {
        var record;
        if(simulatedGameLastEventIndex < sportsData.events.length - 1) {
            simulatedGameLastEventIndex++;
            console.log('simulatedGameLastEventIndex received: ' + simulatedGameLastEventIndex);
            record = sportsData.events[simulatedGameLastEventIndex];
        } else {
            /* If feed doesn't have a completed status, let's force the simulation to complete*/
            record = sportsData.events[simulatedGameLastEventIndex];
            record.status = COMPLETED_STATUS;
            simulatedGameLastEventIndex = COMPLETED_STATUS;
        }
        record.feedId = event.game.feedConfig.feedId;
        record.providerId = event.game.feedConfig.providerId;
        record.gameId = event.game.id;
        record.id += '#' + new Date().getTime(); // let's randomize record.id of simulated events
        console.log('KINESIS PUT RECORD as: ');
        console.log(JSON.stringify(record,null,2));
        const data = await kinesis.putRecord({
            Data: JSON.stringify(record),
            PartitionKey: record.providerId + record.feedId,
            StreamName: streamName
        }).promise();
        console.log('KINESIS PUT RECORD DATA IS: ');
        console.log(JSON.stringify(data,null,2));
    }
      
    console.log('returning simulatedGameLastEventIndex: ' + simulatedGameLastEventIndex);
    callback(null, simulatedGameLastEventIndex);
};
