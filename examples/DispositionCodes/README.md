# Disposition Codes Example

## Description
The disposition codes example provides a complete implementation of how you can use step-by-step guides to have agents provide disposition codes at the end of their call. Agents can provide basic information about the call and tag it based on a set of pre-defined tags. These tags can be manually edited within the Show View block.

**Note:** With Step-by-step guides, the contact attributes created inside a guide are attached to the contactId associated to it. In this example, we are ddemonstrating how these attributes can be attached to the original contact as well. 

## How to use

### Prerequisites
This example uses AWS Lambda to attach contact attributes to a contact. To use this demo please ensure you have:
1. The ability to create [AWS Lambda](https://aws.amazon.com/lambda/) functions with permission to use [UpdateContactAttributes](https://docs.aws.amazon.com/connect/latest/APIReference/API_UpdateContactAttributes.html) on your Amazon Connect instance.
### Implementation steps
1. Create the sample AWS Lambda functions
    1. Download the [updateContactAttributes.mjs](./sampleLambda/updateContactAttributes.mjs)
    1. Create a new AWS Lambda function for NodeJS using the code from sendEmail.mjs. See instructions on [creating an AWS Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html).
    1. Navigate to the AWS Lambda function's [execution role](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html) by choosing **Configuration** > **Permissions** and clicking the link for the **Role name**. This will open up the IAM manager tab.
    1. [Attach an inline policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-attach-detach.html#add-policies-console) to your AWS Lambda role based on the below example. **IMPORTANT: the policy below is meant as an example. Always reference specific ARNs and follow the [principle of least privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)**
    ```
     {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "connect:UpdateContactAttributes",
                "Resource": [
                    "arn:aws:connect:[REGION]:[AWS ACCOUNT ID]:instance/[AMAZON CONNECT INSTANCE ID]/contact/*"
                ]
            }
        ]
    }
    ```
    6. Associate the Lambda function with your Amazon Connect instance. For instructions see [Add a Lambda Function to Amazon Connect](https://docs.aws.amazon.com/connect/latest/adminguide/connect-lambda-functions.html#add-lambda-function).

1. Download the SBSGuides_Example_DispositionCodes_Guide.json and SBSGuides_Example_DispositionCodes_Handler.json
2. Create and configure the main contact flow
1. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
1. Click the drop-down arrow on the right and choose **Import (beta)** and import the SBSGuides_Example_DispositionCodes_Guide.json.
1. Click **Publish**
1. Click **Show Additional Flow Information** on the bottom of the contact flow editor.
1. Copy the contact flow ID. This value is everything after *contact-flow/* in the contact flow ARN. See [here](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html) for more detailed instructions.
1. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
1. Click the drop-down arrow on the right and choose **Import (beta)** and import the SBSGuides_Example_DispositionCodes_Handler.json.
1. Within the handler flow set the `DisconnectFlowForAgentUI` attribute value as the contact flow ID you copied if you want the example guide to appear when the agent first connects with the contact.
1. If you want the example guide to appear when the agent starts the call set `DefaultFlowForAgentUI` attribute value as the contact flow ID you copied. Otherwise delete the attribute.
1. Set the `WorkingQueue` attribute value as the ARN of the queue you want to use while testing this example. To find the queue ARN in your Amazon Connect instance go to **Routing** > **Queues** and click the queue you want to use. Click the **Show additional queue information** dropdown to see the ARN.
1. Click **Save**
1. Click **Publish**

Once you have finished the implementation steps you can run the example as follows:

1. Log into your [agent workspace](https://docs.aws.amazon.com/connect/latest/adminguide/agent-user-guide.html).
1. In a separate tab open your Amazon Connect instance and connect the handler flow you created during the implementation to a phone number (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/tutorial1-assign-contact-flow-to-number.html)) or within a test chat (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/chat-testing.html#test-chat)).
1. Initiate a new contact by calling the phone number you used in the previous step 
1. Accept the contact within your agent workspace tab.
1. The step-by-step guide you set using the `DefaultFlowForAgentUI` attribute should appear immediately. When you disconnect from the contact the step-by-step guide you set using the `DisconnectFlowForAgentUI` attribute will appear.