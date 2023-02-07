var AWS = require('aws-sdk')
var SNS = new AWS.SNS()

exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));

    var destination = event.Details.Parameters.destination;
    var message = event.Details.Parameters.message;

    console.log(message);

    var params = {
        PhoneNumber: destination,
        Message: message,
    }
    
    var attributes = {
        attributes : {
            'DefaultSMSType' : 'Transactional'
        }
    }
    
    SNS.setSMSAttributes(attributes).promise()
    .then(() => {
        SNS.publish(params).promise()
        .then((data) => {
            console.log(data);
            callback(null, buildResponse(true, "Success"));
        })
    })
    .catch((err) => {
        console.log(err);
        callback(null, buildResponse(false, "Error"));
    });

    function buildResponse(isSuccess, message) {
        return {
            success: isSuccess,
            message
        }
    }
}