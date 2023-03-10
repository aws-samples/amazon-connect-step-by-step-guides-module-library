import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export const handler = async (event, context, callback) => {

    const sesClient = new SESClient();
    
    const dataFromForm = event.Details.Parameters.formData;    
    const customerName = event.Details.Parameters.customerFullName;
    console.log(dataFromForm);

    const messageBodyHTML = 
        `<p>Message: ${customerName}</p>
        
        <h4>Message from SBSGuides</h4>
        <ul>
          <li>Date: ${dataFromForm['appt-day']}</li>
          <li>Time: ${dataFromForm['appt-time']}</li>
          <li>Details: ${dataFromForm['message-details']}</li>
        </ul>`;
        
    const messageBody = `Message from SBSGuides. ${customerName}, with data 'date': ${dataFromForm['appt-day']}, 'time': ${dataFromForm['appt-time']}, and 'details':${dataFromForm['message-details']}`;
    
    const sendEmailCommand = new SendEmailCommand({
      Destination: { /* required */
        ToAddresses: [
          event.Details.Parameters.destinationEmail,
        ]
      },
      Message: { /* required */
        Body: { /* required */
          Html: {
          Charset: "UTF-8",
          Data: messageBodyHTML
          },
          Text: {
          Charset: "UTF-8",
          Data: messageBody
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Message from SBSGuides'
        }
        },
      Source: event.Details.Parameters.systemEmail
    });
    
    try {
      const response = await sesClient.send(sendEmailCommand);
      return {"status": 200}
      
    } catch (e) {
      
      console.error("Failed to send email.");
      console.log(e);
      return {"status": 500}
    }
};