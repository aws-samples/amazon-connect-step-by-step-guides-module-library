# AWS Lambda Integration

## Description
The AWS Lambda integration module provides a basic integration between AWS Lambda and your SBSGuides. It consists of a View contact flow that defines the step-by-step guide for the agent and two sample Lambda functions. One Lambda function return sample data while the other receives data from the View and writes it to the log file. Learn more about [Invoking AWS Lambda functions with Amazon Connect](https://docs.aws.amazon.com/connect/latest/adminguide/connect-lambda-functions.html).

Like all of our SBSGuides, you will want to have an accompanying [handler flow](../HandlerFlow/) if you want to use this as an end-to-end solution.

In the View contact flow we:
- Enable logging
- Invoke a Lambda function to send sample data to our flow
- Display the data from Lambda in a View
- Give the agent an option to invoke another Lambda function or refresh the View

### User Defined Attributes
There are no user defined attributes for this module. You will need to update the Invoke Lambda Function blocks though to reference the functions in your account.

## Agent Experience
When activated, the agent will see sample data that was received from the **ToView** Lambda function. They will have the option to refresh the View or invoke another Lambda function. If they invoke another Lambda function nothing in the View happens. However, if you check the CloudWatch logs for the **FromView** Lambda function you will see it was invoked and logging data about the View and what button the agent clicked.

## How to use
To use this module we first want to create our Lambda functions. This can be done by [creating two Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html) within your AWS account and copying the sample code from the [Lambda Integration](./sampleLambdas/) folder. Make sure to follow these instructions for both the ToView Lambda and the FromView Lambda

We then need to give our Amazon Connect instance permission to invoke these Lambda functions. To do this read [Add a Lambda function to your Amazon Connect instance](https://docs.aws.amazon.com/connect/latest/adminguide/connect-lambda-functions.html#add-lambda-function). Make sure to follow these instructions for both Lambdas.

Next we create the View contact flow. This can be done by [directly importing](https://docs.aws.amazon.com/connect/latest/adminguide/contact-flow-import-export.html)viewContactFlow.json into your Amazon Connect instance. Once imported, click the first **Invoke AWS Lambda Function** block. For Function ARN choose **Set manually**, select the **ToView** Lambda, and click **Save**. Do the same with the second **Invoke AWS Lambda Function** block but with the **FromView**. Publish the contact flow and take note of the [contact flow ID](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html).

You can now reference this flow in the `DefaultFlowForAgentUI` or `DisconnectFlowForAgentUI` attributes of a handler flow to test the flow.