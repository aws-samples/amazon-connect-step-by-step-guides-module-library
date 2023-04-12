# Create and Review Tasks Example

## Description
The create and review tasks example provides a complete implementation of how you can use step-by-step guides with [Amazon Connect Tasks](https://aws.amazon.com/connect/tasks/) to create new tasks from forms and have another agent review the task's content.

There are two main contact flows with this example. 
1. Create Task: In this flow the agent is provided a form to create a task. They can then submit this task to be reviewed.
2. Review Task: This flow gets called when an agent accepts a task that has been flagged for review. When accepted the agent sees the content of the task and is given the option to approve it and provide additional comments. In this example nothing in the backend occurs when the agent approves the task but this could be extended by [integrating with AWS Lambda](https://docs.aws.amazon.com/connect/latest/adminguide/connect-lambda-functions.html).

### Overall Flow
**Intial contact:** 
- Incoming contact (call) -> Contact flow (handlerFlow) -> set Create Task flow as `DefaultFlowForAgentUI` -> Send to queue -> Agent accepts contact -> Contact flow (Create Task) -> Display Form view -> Fill out form -> Invoke Lambda to flatten the JSON -> Create Task based on the flattened JSON values setting `DefaultFlowForAgentUI` to Review Task flow -> Display Confirmation View -> Return to Detail view

**Task**
- Incoming contact (task) -> Contact flow (Create Task) -> see contact is of type TASK so route to agent -> Agent accepts contact -> Contact flow (Review Task) -> Display Form view -> Review task values and approve -> Display Confirmation View -> Return to Form view

## How to use

### Prerequisites
To use this demo please:
1. Ensure you have admin level access within your Amazon Connect instance.
1. Have permission to deploy AWS Lambda functions to your AWS account.

### Implementation steps
1. Create the simplify form data AWS Lambda function
    1. Download [simplifyFormData.mjs](./sampleLambda/simplifyFormData.mjs) file in the sampleLambda folder.
    1. [Create a new AWS Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html) for NodeJS using the code from this file 
    1. [Associate the Lambda function with your Amazon Connect instance](https://docs.aws.amazon.com/connect/latest/adminguide/connect-lambda-functions.html#add-lambda-function).

1. Create and configure the Review Task contact flow
    1. Download the [Review Task contact flow](./SBSGuides_Examples_CreateAndReviewTask_Review.json)
    1. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
    1. Click the drop-down arrow on the right and choose **Import (beta)** and import the contact flow.
    1. Click **Publish**
    1. Click **Show Additional Flow Information** on the bottom of the contact flow editor.
    1. Copy the contact flow ID. This value is everything after *contact-flow/* in the contact flow ARN. See [Find Contact Flow ID](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html) for more detailed instructions.

1. Create and configure the Create Task contact flow
    1. Download the [Create Task contact flow](./SBSGuides_Examples_CreateAndReviewTask_Create.json)
    1. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
    1. Click the drop-down arrow on the right and choose **Import (beta)** and import the contact flow.
    1. Click the **Invoke AWS Lambda function** block. Under **Function ARN** for **Set manually** select the simplify form data function we made earlier. Click **Save**
    1. Click the **Set working queue** block. Under **By agent** for **Set manually** choose the agent you want to route the task to. For example purposes we recommend setting this to yourself. Click **Save**.
    1. Click the **Create task** block. Under **Flow** for **Set manually** choose any contact flow. This will be updated shortly after we publish this flow to have it reference itself. 
    1. Under **Task attributes** for the **DefaultFlowForAgentUI** value copy the Review Task contact flow ID. Click **Save**
    1. Click **Publish**
    1. Open the **Create task** block again and change the contact flow we assigned to the Create Task contact flow (the same one we are editing now). Click **Save**
    1. Click **Publish**

1. Create and configure the Handler clontact flow.
    1. Download the [Handler flow](./handlerFlow.json.json)
    1. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
    1. Click the drop-down arrow on the right and choose **Import (beta)** and import the contact flow.
    1. Click the **Set contact attributes** block. Set the `DefaultFlowForAgentUI` attribute value as the contact flow ID you copied while creating the main contact flow.
    1. If you want to have a disconnect flow as well, set the `DisconnectFlowForAgentUI` attribute value as the contact flow ID of another step-by-step guide.. Otherwise delete the attribute.
    1. Set the `WorkingQueue` attribute value as the ARN of the queue you want to use while testing this example. To find the queue ARN in your Amazon Connect instance go to **Routing** > **Queues** and click the queue you want to use. Click the **Show additional queue information** dropdown to see the ARN. Click **Save**
    1. Click **Publish

Once you have finished the implementation steps you can run the example as follows:

1. Log into your [agent workspace](https://docs.aws.amazon.com/connect/latest/adminguide/agent-user-guide.html).
1. In a separate tab open your Amazon Connect instance and [connect the handler flow](https://docs.aws.amazon.com/connect/latest/adminguide/tutorial1-assign-contact-flow-to-number.html) you created during the implementation to a phone number.
1. Initiate a new contact by calling the phone number you used in the previous step 
1. Accept the contact within your agent workspace tab.
1. The step-by-step guide you set using the `DefaultFlowForAgentUI` attribute should appear immediately. When you disconnect from the contact the step-by-step guide you set using the `DisconnectFlowForAgentUI` attribute will appear.