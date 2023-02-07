const AWS = require("aws-sdk");
const mime = require("mimemessage");

exports.handler = (event, context, callback) => {

    let ses = new AWS.SES();

    var mailContent = mime.factory({ contentType: "multipart/mixed", body: [] });

    mailContent.header("From", process.env.FROM);
    mailContent.header("To", event.Details.Parameters.destination);
    mailContent.header("Subject", event.Details.Parameters.subject);

    var alternateEntity = mime.factory({
        contentType: "multipart/alternate",
        body: [],
    });

    var plainEntity = mime.factory({
        body: event.Details.Parameters.body
    });

    alternateEntity.body.push(plainEntity);
    mailContent.body.push(alternateEntity);

    ses.sendRawEmail(
        {
            RawMessage: { Data: mailContent.toString() },
        },
        (err, data) => {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data); // successful response
        }
    );
};
