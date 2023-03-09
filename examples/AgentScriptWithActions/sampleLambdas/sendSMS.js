import { 
    SNSClient, 
    SetSMSAttributesCommand, 
    PublishCommand 
} from "@aws-sdk/client-sns";


export const handler = async(event) => {
    
    const snsClient = new SNSClient();
    
    const dataFromForm = event.Details.Parameters.formData;
    const destination = event.Details.Parameters.destination;
    
    const params = {
        PhoneNumber: destination,
        Message: `Message from SBSGuides. ${event.Details.Attributes.CustomerFullName}, with data 'date': ${dataFromForm['appt-day']}, 'time': ${dataFromForm['appt-time']}, and 'details':${dataFromForm['message-details']}`
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
