# Handler Flow

## Description
The handler flow provides a basic contact flow that integrates your step-by-step guides into the agent experience. Because step-by-step guides are contact method agnostic (voice, chat, task) we never want to send a call directly to a contact flow containing a Show View block. Rather, we can use handler flows that define context for the customer interaction and then pass the interaction to a relevant Queue. For instance, we use the handler flow to decide:
- which step-by-step guide to use when the agent accepts the contact
- which step-by-step guide to use when the contact ends
- what identifier should we use for the customer (email, phone number, name, etc)
- what other custom attributes are needed for the step-by-step guide to work as intended (querying a datastore, returning the results of some function, integrating with 3rd parties, etc)

### User Defined Attributes
- **DefaultFlowForAgentUI (line 101)**: *contact flow ID*. The contact flow to use to display a step-by-step guide to the agent when they initially connect to the contact. For instance, this may be the contact flow ID for one of the example step-by-step guides that you imported into your Connect instance.
- **DisconnectFlowForAgentUI (line 102)** *contact flow ID*. The contact flow to use to display a step-by-step guide to the agent when the agent disconnects from the contact and enters the post-call work state.
- **WorkingQueue (line 104)** *queue ARN*. The queue we want to transfer the contact to after all relevant contact attributes are set.

## How to use
The handler flow is used to set up the initial context for your contact and let Amazon Connect know what step-by-step guides to show to the agent when they are interacting with the contact. The contactFlow.json can be directly imported into your Amazon Connect instance (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/contact-flow-import-export.html) for instructions) and the relevant user defined attributes should be edited before publishing, referencing the step-by-step guides you wish to use.

Once the handler flow is published you can connect a phone number directly to the handler flow to use it when receiving calls.