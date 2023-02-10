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
        Message: `Patient ${dataFromForm.firstName} ${dataFromForm.lastName} have cancelled their appointment (${dataFromForm.date} - ${dataFromForm.time}) - ${dataFromForm.details}`
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
