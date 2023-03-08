# Cases Module 

## Description
The [Amazon Connect Cases](https://aws.amazon.com/connect/cases/) integration module provides a basic integration between Cases and your SBSGuides. It consists of a View contact flow that defines the step-by-step guide for the agent and a sample Lambda function for simplifying the form data object. Learn more about [using Amazon Connect Cases](https://docs.aws.amazon.com/connect/latest/adminguide/cases.html).

Like all of our SBSGuides, you will want to have an accompanying [handler flow](../HandlerFlow/) if you want to use this as an end-to-end solution.

In the View contact flow we:
- Enable logging
- Create a sample [Customer Profile](https://aws.amazon.com/connect/customer-profiles/) to use with Cases
- Display a form for the agent to fill out to create a new case
- Extract the relevant data from the form using a Lambda function
- Create a new case and display its contents to the agent

**Note**: There is a delay added between creating the case and showing it to the agent. This is because cases are not created instantly so this gives Amazon Connect time to make the case.

### User Defined Attributes
There are no user defined attributes for this module. You will need to update the Invoke Lambda Function block to reference the functions in your account. You will also need to update the Cases block to reference a Case template created in your instance (instructions provided below).

## Agent Experience
When activated, the agent is presented with a form to create a new case for the current contact. Upon submitting the required data, a new case is made and the agent is shown the details for that case. They are also given the option to create another case.

## How to use
**IMPORTANT** Before using this module, you must have Cases enabled for your Amazon Connect instance. If you do not follow the [Enable Cases documentation](https://docs.aws.amazon.com/connect/latest/adminguide/enable-cases.html).

To use this module we first want to create our Lambda function. This can be done by [creating a Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html) within your AWS account and copying the sample code from the [provided sample Lambda](./sampleLambda/SBSGuides_Cases_SimplifyFormData.js).

We then need to give our Amazon Connect instance permission to invoke this function. To do this read [Add a Lambda function to your Amazon Connect instance](https://docs.aws.amazon.com/connect/latest/adminguide/connect-lambda-functions.html#add-lambda-function) and follow the steps for your Lambda function

Next we create a sample Case template to use with our module. Follow the [How to Create Templates](https://docs.aws.amazon.com/connect/latest/adminguide/case-templates.html#how-to-create-template) guide. For this module make sure that your template has the **Summary**, **Reference Number**, and **Customer** field added to them.

Now we create the View contact flow. This can be done by [directly importing](https://docs.aws.amazon.com/connect/latest/adminguide/contact-flow-import-export.html)viewContactFlow.json into your Amazon Connect instance. Once imported, click the **Invoke AWS Lambda Function** block. For Function ARN choose **Set manually**, select the Lambda function made earlier, and click **Save**. Then click the first **Cases** block where the action is set to *Create case*. Under **Tempalte** select the case template made earlier. Publish the contact flow and take note of the [contact flow ID](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html).

You can now reference this flow in the `DefaultFlowForAgentUI` or `DisconnectFlowForAgentUI` attributes of a handler flow to test the flow.
