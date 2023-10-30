import * as AWS from "@aws-sdk/client-connect";
const connectInstanceId = process.env.INSTANCE_ID;
const connect = new AWS.Connect({ region: process.env.REGION_ID }, {apiVersion: '2017-08-08'});


export const handler = async (event) => {
    console.log(JSON.stringify(event));
    var status = 200;
    var message = "Success";
    var operation = event.Details.Parameters.operation;
    var contactId = event.Details.ContactData.RelatedContactId
    var initialContactId = event.Details.Parameters.initialContactId
    if (event.Details.Parameters.voiceRecordingTrack) {
        var voiceRecordingTrack = (event.Details.Parameters.voiceRecordingTrack)
    }
    try{
        var resp;
        if(operation == 'START'){
            resp = await startContactRecording(connectInstanceId, contactId, initialContactId, voiceRecordingTrack);
            console.log(resp);
        }else if(operation == 'STOP'){
            resp = await stopContactRecording(connectInstanceId, contactId, initialContactId);
            console.log(resp);
        }else if(operation == 'PAUSE'){
            resp = await suspendContactRecording(connectInstanceId, contactId, initialContactId);
            console.log(resp);
        }else if(operation == 'RESUME'){
            resp = await resumeContactRecording(connectInstanceId, contactId, initialContactId);
            console.log(resp);
        }else{
            console.log("NO MATCH ON OPERATION");
        }
    }catch(e){
        console.log(e);
        status = e.$metadata.httpStatusCode;
        message = e.message;
    }
    
    const response = buildResponse(status, message, operation);
    return response;
};

function buildResponse(status, message, operation){
    const response = {
        statusCode: status,
        message : message, 
        operation : operation
    };
    console.log(JSON.stringify(response));
    return response;
    
}

const startContactRecording = (instanceId, contactId, initialContactId, voiceRecordingTrack) =>{
	return new Promise((resolve,reject) =>{
	   var config = {VoiceRecordingTrack: voiceRecordingTrack};
       var params = {InstanceId : instanceId, ContactId : contactId, InitialContactId : initialContactId, VoiceRecordingConfiguration : config};       
       console.log(params);
	   connect.startContactRecording(params, function (err, res) {        
		    if (err) 
		         reject(err);
		     else 
				resolve(res);
	    });
	});
}

const stopContactRecording = (instanceId, contactId, initialContactId) =>{
	return new Promise((resolve,reject) =>{
       var params = {InstanceId : instanceId, ContactId : contactId, InitialContactId : initialContactId};       
       console.log(params);
	   connect.stopContactRecording(params, function (err, res) {        
		    if (err) 
		         reject(err);
		     else 
				resolve(res);
	    });
	});
}

const suspendContactRecording = (instanceId, contactId, initialContactId) =>{
	return new Promise((resolve,reject) =>{
       var params = {InstanceId : instanceId, ContactId : contactId, InitialContactId : initialContactId};       
       console.log(params);
	   connect.suspendContactRecording(params, function (err, res) {        
		    if (err) 
		         reject(err);
		     else 
				resolve(res);
	    });
	});
}

const resumeContactRecording = (instanceId, contactId, initialContactId) =>{
	return new Promise((resolve,reject) =>{
       var params = {InstanceId : instanceId, ContactId : contactId, InitialContactId : initialContactId};       
       console.log(params);
	   connect.resumeContactRecording(params, function (err, res) {        
		    if (err) 
		         reject(err);
		     else 
				resolve(res);
	    });
	});
}
