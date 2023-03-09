# Cards Example

## Description
The cards example provides a complete implementation of how you can use step-by-step guides with the cards view to provide a landing page for agents to address customer usecases in the [agent workspace](https://aws.amazon.com/connect/agent-workspace/).

There is one main contact flow with this example. 
- Cards Guide: In this flow the agent is presented with a set of cards to choose from to address the customer's need. Under the file luggage claim card they can start the process for filing a new luggage claim

### Overall Flow
Incoming contact (call) -> Contact flow (handlerFlow) -> Prompt caller to provide reason for calling and set Cards Guide flow as `DefaultFlowForAgentUI` -> Send to queue -> Agent accepts contact -> Contact flow (Cards Guide) -> Get current customer profile or create a new one -> Display set of cards the agent can use -> Click Lost luggage claim card and Start a new claim -> Display Form view -> Fill out form and submit -> Display Confirmation View -> Return to Card view
## How to use

### Prerequisites
To use this demo please:
1. [Enable Customer Profiles](https://docs.aws.amazon.com/connect/latest/adminguide/enable-customer-profiles.html) for your Amazon Connect instance.
1. Ensure you have admin level access within your Amazon Connect instance.

### Implementation steps

1. Create and configure the Cards Guide contact flow
    1. Download the [Cards Guide flow](./SBSGuides_Example_Cards_Guide.json).
    1. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
    1. Click the drop-down arrow on the right and choose **Import (beta)** and import the contactFlow.json.
    1. Click **Publish**
    1. Click **Show Additional Flow Information** on the bottom of the contact flow editor.
    1. Copy the contact flow ID. This value is everything after *contact-flow/* in the contact flow ARN. See [Find Contact Flow ID](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html) for more detailed instructions.

1. Create and configure the handler contact flow
    1. Download the [Cards Handler flow](./SBSGuides_Example_Cards_Handler.json)
    1. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
    1. Click the drop-down arrow on the right and choose **Import (beta)** and import the handlerFlow.json.
    1. Click the **Set contact attributes** block. Set the `DefaultFlowForAgentUI` attribute value as the contact flow ID you copied while creating the main contact flow.
    1. Set the `WorkingQueue` attribute value as the ARN of the queue you want to use while testing this example. To find the queue ARN in your Amazon Connect instance go to **Routing** > **Queues** and click the queue you want to use. Click the **Show additional queue information** dropdown to see the ARN.
    1. Click **Save**
    1. Click **Publish**

Once you have finished the implementation steps you can run the example as follows:

1. Log into your [agent workspace](https://docs.aws.amazon.com/connect/latest/adminguide/agent-user-guide.html).
1. In a separate tab open your Amazon Connect instance and [connect the handler flow](https://docs.aws.amazon.com/connect/latest/adminguide/tutorial1-assign-contact-flow-to-number.html) you created during the implementation to a phone number.
1. Initiate a new contact by calling the phone number you used in the previous step 
1. Accept the contact within your agent workspace tab.
1. The step-by-step guide you set using the `DefaultFlowForAgentUI` attribute should appear immediately.