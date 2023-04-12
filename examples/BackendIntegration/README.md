# Backend Integration

## Description
This guide demonstrates how we can use the information collected in our SBSGuides to integrate with backend systems to send templated emails and SMS.

There are 2 main Views in this example:
1. A Cards view, presenting the agent with potential guides fro the current call. We use Cards to group the information in a logical, user-friendly manner. The "Cancellations" card contains actions that the agent can use to send a cancellation notice.
2. A Form, which is used to collect customer information in order to populate the email and SMS templates. The fields are auto-populated if Amazon Connect Customer Profiles data is available for that contact.

### Overall Flow
Incoming contact (handlerFlow) -> Contact flow set the guides flow as `DefaultFlowForAgentUI` -> Send to queue -> Agent accepts contact -> Contact flow (contactFlow) -> Get profile -> Display Cards view -> Click "Card 2" -> Choose "Action 1" or "Action 2" -> Display Form -> Enter details (will be prepopulated with customer profile data) -> Invoke Lambda to send SMS, and Invoke Lambda to send email -> Display Confirmation View -> Return to Cards view

## How to use

### Prerequisites
This example uses several Amazon Connect features that are not enabled by default. To use this demo please:
1. [Enable Customer Profiles](https://docs.aws.amazon.com/connect/latest/adminguide/enable-customer-profiles.html) for your Amazon Connect instance.
1. The ability to send email using [Amazon Simple Email Service](https://aws.amazon.com/ses/) (SES) and a verified identity for sending emails. You can still run this example without a verified identity but the Lambda will fail.
1. The ability to send SMS using [Amazon Simple Notification Service](https://aws.amazon.com/sns/) (SNS) and an origination number for sending texts. You can still run this example without an origination number but the Lambda will fail.
1. The ability to create [AWS Lambda](https://aws.amazon.com/lambda/) functions with permission to call SES and SNS.
### Implementation steps
1. Create the sample AWS Lambda functions
    1. Download the [sendEmail.mjs](./sampleLambdas/sendEmail.mjs) and [sendSMS.mjs](./sampleLambdas/sendSMS.mjs) files in the sampleLambdas folder
    1. Create a new AWS Lambda function for NodeJS using the code from sendEmail.mjs. See instructions on [creating an AWS Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html).
    1. Navigate to the AWS Lambda function's [execution role](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html) by choosing **Configuration** > **Permissions** and clicking the link for the **Role name**. This will open up the IAM manager tab.
    1. [Attach an inline policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-attach-detach.html#add-policies-console) to your AWS Lambda role based on the below example. **IMPORTANT: the policy below is meant as an example. Always reference specific ARNs and follow the [principle of least privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)**
    ```
     {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "ses:SendEmail",
                "Resource": [
                    "arn:aws:ses:[REGION]:[AWS ACCOUNT ID]:template/[IDENTITY NAME]",
                    "arn:aws:ses:[REGION]:[AWS ACCOUNT ID]:identity/[IDENTITY NAME]",
                    "arn:aws:ses:[REGION]:[AWS ACCOUNT ID]:configuration-set/[IDENTITY NAME]"
                ]
            }
        ]
    }
    ```
    5. Repeat step 2 through 4 for the second Lambda function using sendSMS.mjs file and the following in-line policy example. **IMPORTANT: the policy below is meant as an example. Always reference specific ARNs and follow the [principle of least privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)**
    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "sns:Publish",
                "Resource": "arn:aws:sns:[REGION]:[AWS ACCOUNT ID]:[TOPIC NAME]"
            }
        ]
    }
    ```
    6. Associate the two Lambda functions with your Amazon Connect instance. For instructions see [Add a Lambda Function to Amazon Connect](https://docs.aws.amazon.com/connect/latest/adminguide/connect-lambda-functions.html#add-lambda-function).

2. Create and configure the main contact flow
    1. Download the [SBSGuides_Example_Backend_Guide.json](./SBSGuides_Example_Backend_Guide.json)
    2. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
    3. Click the drop-down arrow on the right and choose **Import (beta)** and import the flow.
    4. Click the 2x **Invoke AWS Lambda function** block. For the `Function ARN`, select the AWS Lambda functions that will send the SMS / email. Click **Save**.
    5. For these 2 functions, observe the parameters. They will need to be adjusted with:
        - A valid email address to send the email notification to. Note this email must be [registered with SES](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html)
        - A valid email address to receive the email notification 
        - A valid phone number to send the SMS to
    6. In the 3 Show View blocks (Cards, Form and Confirmation), in the AttributesBar section, enter a valid URL to demonstrate the ability to open external links
    7. Click **Publish**
    8. Click **Show Additional Flow Information** on the bottom of the contact flow editor.
    9. Copy the contact flow ID. This value is everything after *contact-flow/* in the contact flow ARN. See [here](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html) for more detailed instructions.

2. Create and configure the handler contact flow
    1. Download the [SBSGuides_Example_Backend_Handler.json](./SBSGuides_Example_Backend_Handler.json)
    2. In your Amazon Connect instance go to **Routing** > **ContactFlows** > **Create contact flow**.
    3. Click the drop-down arrow on the right and choose **Import (beta)** and import the SBSGuides_Example_Backend_Handler.json.
    4. Click the **Set contact attributes** block. Set the `DefaultFlowForAgentUI` attribute value as the contact flow ID you copied while creating the main contact flow.
    5. If you want to have a disconnect flow as well, add a `DisconnectFlowForAgentUI` attribute value as the contact flow ID of another Step-By-Step Guide workflow.
    6. Set the `WorkingQueue` attribute value as the ARN of the queue you want to use while testing this example. To find the queue ARN in your Amazon Connect instance go to **Routing** > **Queues** and click the queue you want to use. Click the **Show additional queue information** dropdown to see the ARN.
    7. Click **Save**
    8. Click **Publish**

Once you have finished the implementation steps you can run the example as follows:

1. Log into your [agent workspace](https://docs.aws.amazon.com/connect/latest/adminguide/agent-user-guide.html).
2. In a separate tab open your Amazon Connect instance and connect the inbound contact flow you created during the implementation to a phone number (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/tutorial1-assign-contact-flow-to-number.html)) or within a test chat (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/chat-testing.html#test-chat)).
3. Initiate a new contact by calling the phone number you used in the previous step 
4. Accept the contact within your agent workspace tab.
5. The step-by-step guide you set using the `DefaultFlowForAgentUI` attribute should appear immediately. When you disconnect from the contact the step-by-step guide you set using the `DisconnectFlowForAgentUI` attribute will appear.