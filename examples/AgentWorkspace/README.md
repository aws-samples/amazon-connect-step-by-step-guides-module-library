# Agent Workspace Example

## Description
The agent workspace example provides a complete implementation of how you can use step-by-step guides with other features of the [agent workspace](https://aws.amazon.com/connect/agent-workspace/). This step-by-step guide is integrated with [customer profiles](https://docs.aws.amazon.com/connect/latest/adminguide/customer-profiles.html), [cases](https://docs.aws.amazon.com/connect/latest/adminguide/cases.html), [voice ID](https://docs.aws.amazon.com/connect/latest/adminguide/voice-id.html), and [tasks](https://docs.aws.amazon.com/connect/latest/adminguide/tasks.html). It also is integrated with [AWS Lambda](https://docs.aws.amazon.com/connect/latest/adminguide/connect-lambda-functions.html)

There are two main Views with this example. 
1. Contact Information View: This view is displayed when the agent connects to the call. Here they can conveniently see information about the current contact and cases related to the caller.
2. File Insurance Claim View: This view can be initiated by clicking on the "File insurance claim" button in the Contact Information View. Here the agent is prompted to fill out a sample insurance claim for the caller. When the claim is submitted an example AWS Lambda function is invoked and a Task with information from the insurance claim is created.

### Overall Flow
Incoming contact (call) -> Contact flow (AgentWorkspaceExample_handler) -> Look up or create customer profile, create new Case, enable Voice ID, set AgentWorkspaceExample as `DefaultFlowForAgentUI` -> Send to queue -> Agent accepts contact -> Contact flow (AgentWorkspaceExample) -> Get profile/case/voice ID -> Display Detail view with customer/case info -> Click Insurance Claim / Refresh -> Display Wizard view -> Enter claim details -> Invoke Lambda to flatten the JSON -> Create Task based on the flattened JSON values -> Display Confirmation View -> Return to Detail view

## How to use

### Prerequisites
This example uses several Amazon Connect features that are not enabled by default. To use this demo please:
1. [Enable Customer Profiles](https://docs.aws.amazon.com/connect/latest/adminguide/enable-customer-profiles.html) for your Amazon Connect instance.
1. [Enable Cases](https://docs.aws.amazon.com/connect/latest/adminguide/enable-cases.html) for your Amazon Connect instance.
1. [Enable Voice ID](https://docs.aws.amazon.com/connect/latest/adminguide/enable-voiceid.html) for your Amazon Connect instance.
1. Ensure you have account permissions to create AWS Lambda functions and associate them with your Amazon Connect instance.
1. Ensure you have admin level access within your Amazon Connect instance.

### Implementation steps
1. Create the sample AWS Lambda function
    1. Download the index.js file in the sampleLambda folder.
    1. Create a new AWS Lambda function for NodeJS using the code from this file. For instructions on creating an AWS Lambda function see [here](https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html).
    1. Associate the Lambda function with your Amazon Connect instance. For instructions see [here](https://docs.aws.amazon.com/connect/latest/adminguide/connect-lambda-functions.html#add-lambda-function)

1. Create and configure the main contact flow
    1. Download the contactFlow.json
    1. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
    1. Click the drop-down arrow on the right and choose **Import (beta)** and import the contactFlow.json.
    1. Click the **Invoke AWS Lambda function** block. For the `Function ARN` select the AWS Lambda function created earlier. Click **save**.
    1. Click the **Create task** block. For the `Flow` section select the contact flow you want to use to route where the Task goes. If you are not sure which one to use we recommend **Sample queue customer** for testing purposes. Click **save**.
    1. Click **Publish**
    1. Click **Show Additional Flow Information** on the bottom of the contact flow editor.
    1. Copy the contact flow ID. This value is everything after *contact-flow/* in the contact flow ARN. See [here](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html) for more detailed instructions.

1. Create a Case template to use with the example. See [here](https://docs.aws.amazon.com/connect/latest/adminguide/case-templates.html) for instructions. For this example we want our Case to have fields for title, status, summary, and date/time Created.

1. Create and configure the handler contact flow
    1. Download the handlerFlow.json
    1. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
    1. Click the drop-down arrow on the right and choose **Import (beta)** and import the handlerFlow.json.
    1. Click the **Set contact attributes** block. Set the `DefaultFlowForAgentUI` attribute value as the contact flow ID you copied while creating the main contact flow.
    1. If you want to have a disconnect flow as well, set the `DisconnectFlowForAgentUI` attribute value as the contact flow ID of another step-by-step guide.. Otherwise delete the attribute.
    1. Set the `WorkingQueue` attribute value as the ARN of the queue you want to use while testing this example. To find the queue ARN in your Amazon Connect instance go to **Routing** > **Queues** and click the queue you want to use. Click the **Show additional queue information** dropdown to see the ARN.
    1. Click **Save**
    1. Click the **Cases** block. For `Template` select the Case template you created previously. Click **Save**.
    1. Click **Publish**

Once you have finished the implementation steps you can run the example as follows:

1. Log into your [agent workspace](https://docs.aws.amazon.com/connect/latest/adminguide/agent-user-guide.html).
1. In a separate tab open your Amazon Connect instance and connect the handler flow you created during the implementation to a phone number (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/tutorial1-assign-contact-flow-to-number.html)) or within a test chat (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/chat-testing.html#test-chat)).
1. Initiate a new contact by calling the phone number you used in the previous step 
1. Accept the contact within your agent workspace tab.
1. The step-by-step guide you set using the `DefaultFlowForAgentUI` attribute should appear immediately. When you disconnect from the contact the step-by-step guide you set using the `DisconnectFlowForAgentUI` attribute will appear.