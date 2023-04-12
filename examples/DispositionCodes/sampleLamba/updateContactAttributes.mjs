import { 
    ConnectClient, 
    UpdateContactAttributesCommand
} from "@aws-sdk/client-connect";

export const handler = async(event) => {
    
    const client = new ConnectClient();
    
    const input = {
      InitialContactId: event.Details.Parameters.originalContactId,
      InstanceId: event.Details.ContactData.InstanceARN.split("/")[1],
      Attributes: {}
    };
    
    for (const attribute in event.Details.ContactData.Attributes) {
        if (attribute.startsWith("callTag")) {
            input.Attributes[attribute] = event.Details.ContactData.Attributes[attribute];
        }
    }
    
    if (Object.keys(input.Attributes).length > 0) {
        try {
            const res = await client.send(new UpdateContactAttributesCommand(input));
        } catch (e) {
            console.log(e);
            
            return {"status": 500};
        }
        
    }
    
    return {"status": 200};
};
