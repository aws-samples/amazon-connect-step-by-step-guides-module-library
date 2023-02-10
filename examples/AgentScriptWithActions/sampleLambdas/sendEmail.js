import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export const handler = async (event, context, callback) => {

    const sesClient = new SESClient();
    
    const dataFromForm = event.Details.Parameters.formData;
    
    console.log(dataFromForm);

    const messageBodyHTML = 
        `<p>Patient: ${dataFromForm.firstName} ${dataFromForm.lastName}</p>
        
        <h4>Appointment Cancellation</h4>
        <ul>
          <li>Date: ${dataFromForm.date}</li>
          <li>Time: ${dataFromForm.date}</li>
          <li>Details: ${dataFromForm.details}</li>
        </ul>`;
        
    const messageBody = `Patient ${dataFromForm.firstName} ${dataFromForm.lastName} have cancelled their appointment (${dataFromForm.date} - ${dataFromForm.time}) - ${dataFromForm.details}`;
    
    const sendEmailCommand = new SendEmailCommand({
      Destination: { /* required */
        ToAddresses: [
          event.Details.Parameters.physioEmail,
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
          Data: 'Appointment cancellation'
        }
        },
      Source: event.Details.Parameters.systemEmail
    });
    
    try {
      return await sesClient.send(sendEmailCommand);
      
    } catch (e) {
      
      console.error("Failed to send email.");
      console.log(e);
      return e;
    }
};