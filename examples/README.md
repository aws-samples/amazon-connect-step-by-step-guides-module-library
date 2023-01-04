# Examples

## Description
Within this folder are example contact flows that you can import to see how to get started with common use cases for step-by-step guides. These example are provided as is and meant to help bootstrap creating your own guides.

To ensure these examples work across all Amazon Connect instances, any data you see in the guides are manually hardcoded either within the Show View block or as custom contact attributes set at the start of the flow. To create a more dynamic experience we recommend fetching the data in a [handler flow](../flows/HandlerFlow/), setting it as custom attributes, and then using the `DefaultFlowForAgentUI` or `DisconnectFlowForAgentUI` contact attributes to reference the step-by-step guide flow you want to use.

## How to use
All examples are implemented as follows:

1. For the example you wish to use, download the contactFlow.json.
1. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
1. Click the drop-down arrow on the right and choose **Import (beta)** and import the downloaded contact flow.
1. Click **Publish**
1. Click **Show Additional Flow Information** on the bottom of the contact flow editor.
1. Copy the contact flow ID. This value is everything after *contact-flow/* in the contact flow ARN. See [here](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html) for more detailed instructions.
1. Create a [handler flow](../flows/HandlerFlow/) or use a pre-existing one.
1. Within the handler flow set the `DefaultFlowForAgentUI` attribute value as the contact flow ID you copied if you want the example guide to appear when the agent first connects with the contact.
1. If you want the example guide to appear when the agent disconnects from the contact set the `DisconnectFlowForAgentUI` attribute value as the contact flow ID you copied
1. Click **Publish**

Once you have finished the implementation steps you can run the example as follows:

1. Log into your [agent workspace](https://docs.aws.amazon.com/connect/latest/adminguide/agent-user-guide.html).
1. In a separate tab open your Amazon Connect instance and connect the [handler flow](../flows/HandlerFlow/) you used during the implementation to a phone number (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/tutorial1-assign-contact-flow-to-number.html)) or within a test chat (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/chat-testing.html#test-chat)).
1. Initiate a new contact by either calling the phone number you used in the previous step or starting the test chat session.
1. Accept the contact within your agent workspace tab.
1. The step-by-step guide you set using the `DefaultFlowForAgentUI` attribute should appear immediately. When you disconnect from the contact the step-by-step guide you set using the `DisconnectFlowForAgentUI` attribute will appear.