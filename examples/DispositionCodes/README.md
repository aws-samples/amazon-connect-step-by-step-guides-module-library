# Disposition Codes Example

## Description
The disposition codes example provides a complete implementation of how you can use step-by-step guides to have agents provide disposition codes at the end of their call. Agents can provide basic information about the call and tag it based on a set of pre-defined tags. These tags can be manually edited within the Show View block.

## How to use
1. Download the contactFlow.json and handlerFlow.json
1. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
1. Click the drop-down arrow on the right and choose **Import (beta)** and import the contactFlow.json.
1. Click **Publish**
1. Click **Show Additional Flow Information** on the bottom of the contact flow editor.
1. Copy the contact flow ID. This value is everything after *contact-flow/* in the contact flow ARN. See [here](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html) for more detailed instructions.
1. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
1. Click the drop-down arrow on the right and choose **Import (beta)** and import the handlerFlow.json.
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