import { 
  SNSClient, 
  SetSMSAttributesCommand, 
  PublishCommand 
} from "@aws-sdk/client-sns";


export const handler = async(event) => {
  
  const snsClient = new SNSClient();
  console.log(event)
  
  const dataFromForm = event.Details.Parameters.formData;
  const destination = event.Details.Parameters.destination;
  const customerName = event.Details.Parameters.customerFullName;
  console.log(dataFromForm);
  
  const params = {
      PhoneNumber: destination,
      Message: `Message from SBSGuides. ${customerName}, with data 'date': ${dataFromForm['appt-day']}, 'time': ${dataFromForm['appt-time']}, and 'details':${dataFromForm['message-details']}`
  }
  
  const setAttributesCommand = new SetSMSAttributesCommand({
      attributes: {
          DefaultSMSType: "Transactional"
      }
  });
  
  
  try {
      await snsClient.send(setAttributesCommand);
      return await snsClient.send(new PublishCommand(params));
  } catch (e) {
      console.log(e);
      return e;
  }
};
