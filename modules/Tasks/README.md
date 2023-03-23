# Cases Module 

## Description
The [Amazon Connect Tasks](https://aws.amazon.com/connect/tasks/) integration module provides a basic integration between Tasks and your SBSGuides. It consists of two view contact flows. One contains a SBSGuide for creating a task and the other contains a guide for viewing the incoming task. Learn more about [using Amazon Connect Tasks](https://docs.aws.amazon.com/connect/latest/adminguide/tasks.html).

Like all of our SBSGuides, you will want to have an accompanying [handler flow](../HandlerFlow/) if you want to use this as an end-to-end solution.

In the task create view flow we:
- Enable logging
- Display a Details view where the agent can click a button to create a new task
- Create a sample task and route it to the task create view flow
- If the incoming contact is of type TASK the task gets assigned to an agent and sent to their queue

### User Defined Attributes
There are no user defined attributes for this module. You will need to update the Create Task block to reference the relevant flow in your account. You will also need to update the Set Working Queue block to reference an agent in your Amazon Connect instance.

## Agent Experience
When activated, the agent is presented with a button to create a new task. Upon clicking the button a new task with sample data gets created and routed to the agent. When the agent accepts the task, they are shown the content of the task in a Details view.

## How to use

To use this module we first want to import the Task Receive contact flow. This can be done by [directly importing](https://docs.aws.amazon.com/connect/latest/adminguide/contact-flow-import-export.html) SBSGuides_Module_Task_Receive.json into your Amazon Connect instance. Publish the contact flow and take note of the [contact flow ID](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html).

We then need to create the Task Create contact flow. This can be done by [directly importing](https://docs.aws.amazon.com/connect/latest/adminguide/contact-flow-import-export.html) SBSGuides_Module_Task_Create.json into your Amazon Connect instance. Once imported, click the **Create Task** block. Under **Flow** choose **Set manually** and select any flow. We will be changing this value shortly but first publish the flow to make it referenceable.

Next we need to finish updating values in the Task Create contact flow. Click the **Create Task** block again. Under **Flow** choose **Set manually** and select the Task Create contact flow (the flow we are currently in). Under **Task Attributes** for **DefaultFlowForAgentUI** copy the contact flow ID of the Task Receive contact flow. Click **Save**. Click the **Set Working Queue** block. Under **By agent** >> **Set manually** select the agent you want to route the task to. For testing we recommend selecting yourself. Publish the contact flow.

You can now reference the Task Create contact flow in the `DefaultFlowForAgentUI` or `DisconnectFlowForAgentUI` attributes of a handler flow to test the flow.