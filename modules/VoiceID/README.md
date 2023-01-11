# Voice ID Integration

## Description
The voice ID module provides a basic integration between Voice ID and your step-by-step guides. It consists of a handler contact flow that defines the context for the customer interaction and a View contact flow that defines the step-by-step guide for the agent. Because step-by-step guides are contact method agnostic (voice, chat, task) we never want to send a call directly to a View contact flow containing a Show View block. Rather, we reference the View contact flow within our handler flow using the DefaultFlowForAgentUI custom attribute. To learn more about Voice ID for Amazon connect see [here](https://aws.amazon.com/connect/voice-id/).

For this module we use the handler contact flow to:
- Activate voice ID functionality for the call
- Set the customer's ID. In this module this value is set manually but could be pulled dynamically from a CRM using an AWS Lambda function
- Determine which step-by-step guide to use when the agent accepts the contact.
- Collect an initial voice sample for Amazon Connect to use with Voice ID

We use the View contact flow to:
- Check the caller's Voice ID status
- Create and show the View to the agent with relevant information about the call, including the caller's Voice ID status.


### User Defined Attributes
The only attributes that need to be adjusted before publishing are within the handler contact flow.
- **DefaultFlowForAgentUI (line 264)**: *contact flow ID*. The contact flow to use to display a step-by-step guide to the agent when they initially connect to the contact. For this module the contact flow ID should correspond with the viewContactFlow.json found within this folder
- **WorkingQueue (line 266)** *queue ARN*. The queue we want to transfer the contact to after all relevant contact attributes are set.
- **CustomerId (line 283)** *string*. A unique customer identifier for Voice ID to use when validating if the caller is authenticated or not. This could be the customer's phone number, anm account number, or any other unique identifier.

## How to use

*Important*: In order to use Voice ID for Amazon Connect you must enable it for your instance. If you have not already done so follow the instructions [here](https://docs.aws.amazon.com/connect/latest/adminguide/enable-voiceid.html).

To use this module we first want to setup the View contact flow. This can be done by directly importing viewContactFlow.json into your Amazon Connect instance (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/contact-flow-import-export.html) for instructions) and publishing it. Take note of the contact flow ID (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html) for instructions).

We then need to setup the handler contact flow. The handler contact flow for this module should be used like any other handler contact flow. The handlerContactFlow.json can be directly imported into your Amazon Connect instance (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/contact-flow-import-export.html) for instructions) and the relevant user defined attributes should be edited before publishing. To use the View contact flow we imported earlier, when setting the `DefaultFlowForAgentUI` attribute, use your View contact flow ID.

Once the handler flow is published you can connect a phone number directly to the handler flow to use it when receiving calls. When you call in Amazon Connect will collect a voice sample before transferring you to the agent. Once transferred, the caller's voice ID status will appear in the agent workspace alongside other relevant contact information.

*Important*: Step-by-step guides do not dynamically update so it will only show the Voice ID status of the call when it is connected. If the status changes during the call (i.e. the agent goes through the process of enrolling a new voice) you will need to press the "Refresh View" button for the change to appear in the View.