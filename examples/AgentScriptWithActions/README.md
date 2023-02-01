# Agent Script with Actions

## Description
This workflow simulates a script for an agent to follow while handling a call. 

The use case is as follow:
Customers call in the contact centre to interact with a physiotherapist practice. Agent can follow the script to handle the call. This includes opening an external website to actually make the appointment. Sometimes, a customer wishes to cancel their appointment. When this occurs, the correct physio needs to be alerted by SMS and email (in case of urgent cancellations), or by email (for non-urgent cancellations).

### Overall Flow
Incoming contact (call) -> Contact flow set PhysioView as `DefaultFlowForAgentUI` -> Send to queue -> Agent accepts contact -> Contact flow (PhysioView) -> Get profile -> Display Cards view with the procedure to follow -> Click "Cancellations" -> Choose "Urgent Cancellation" or "Standard Cancellation" -> Display Form view -> Enter details (will be prepopulated with customer profile data) -> Invoke Lambda to send SMS + email if urgent / Invoke Lambda to send email if standard -> Display Confirmation View -> Return to Cards view

## How to use

### Prerequisites
This example uses several Amazon Connect features that are not enabled by default. To use this demo please:
1. [Enable Customer Profiles](https://docs.aws.amazon.com/connect/latest/adminguide/enable-customer-profiles.html) for your Amazon Connect instance.
2. Lambda function to send email (with SES for example), associated with Connect instance
3. Lambda function to send SMS (with SNS for example), associated with Connect instance

### Implementation steps
2. Create and configure the main contact flow
    1. Download the physioView.json
    2. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
    3. Click the drop-down arrow on the right and choose **Import (beta)** and import the physioView.json.
    4. Click the 2x **Invoke AWS Lambda function** block. For the `Function ARN`, select the AWS Lambda functions that will send the SMS / email. Click **Save**.
    5. Open the first Show View block (Cards view). In the AttributesBar section, enter a valid URL to demonstrate the ability to open external links
    5. Click **Publish**
    6. Click **Show Additional Flow Information** on the bottom of the contact flow editor.
    7. Copy the contact flow ID. This value is everything after *contact-flow/* in the contact flow ARN. See [here](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html) for more detailed instructions.

2. Create and configure the handler contact flow
    1. Download the inboundContactFlow.json
    2. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
    3. Click the drop-down arrow on the right and choose **Import (beta)** and import the inboundContactFlow.json.
    4. Click the **Set contact attributes** block. Set the `DefaultFlowForAgentUI` attribute value as the contact flow ID you copied while creating the main contact flow.
    5. If you want to have a disconnect flow as well, set the `DisconnectFlowForAgentUI` attribute value as the contact flow ID of another step-by-step guide.. Otherwise delete the attribute.
    6. Set the `WorkingQueue` attribute value as the ARN of the queue you want to use while testing this example. To find the queue ARN in your Amazon Connect instance go to **Routing** > **Queues** and click the queue you want to use. Click the **Show additional queue information** dropdown to see the ARN.
    7. Click **Save**
    8. Click **Publish**

Once you have finished the implementation steps you can run the example as follows:

1. Log into your [agent workspace](https://docs.aws.amazon.com/connect/latest/adminguide/agent-user-guide.html).
2. In a separate tab open your Amazon Connect instance and connect the inbound contact flow you created during the implementation to a phone number (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/tutorial1-assign-contact-flow-to-number.html)) or within a test chat (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/chat-testing.html#test-chat)).
3. Initiate a new contact by calling the phone number you used in the previous step 
4. Accept the contact within your agent workspace tab.
5. The step-by-step guide you set using the `DefaultFlowForAgentUI` attribute should appear immediately. When you disconnect from the contact the step-by-step guide you set using the `DisconnectFlowForAgentUI` attribute will appear.