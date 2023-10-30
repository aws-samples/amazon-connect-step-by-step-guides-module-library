## Start and stop recording using Step-by-step Guides in Amazon Connect

In order to ensure agent compliance, assess call quality, and facilitate training, companies often decide to record contact center calls. With Amazon Connect, these recordings are conveniently stored in an Amazon S3 bucket, enabling companies to access and review them at a later stage. However, it is important to note that when agents handle sensitive customer information, a cautious approach is taken to protect privacy. As a best practice, companies typically refrain from recording this specific portion of the call, thereby prioritizing the security and confidentiality of customer data.

By leveraging Amazon Connect's APIs and the Step-by-step guides functionality to allow agents to select actions, companies can programmatically manage call recordings and customize the recording behavior based on their specific requirements. This includes the ability to automatically pause or resume recordings when certain events occur during a call to support compliance, such as the agent asking for sensitive customer data.

This will walk you through how to set up your agent workspace with button functionality to start, stop, pause, or resume the call recording without the need to set up a custom contact control panel (CCP). 

![Start Stop Pause Resume Recording - Architecture](https://d1khg2kbc0gpyh.cloudfront.net/sbsgithub/architecture-ssprrecording.png)

## Walkthrough

1. Customer calls the business and acknowledges the compliance prompt, which says that the call may be monitored or recorded.
2. Customer is put into a queue and connected to an agent.
3. The agent can start, pause, resume, and stop the call recording from the Agent Workspace by manually pressing buttons that trigger an AWS Lambda function.
4. The Lambda function processes the request and calls the Amazon Connect API to start, pause, resume, or stop the call recording.

## Prerequisites

* AWS account
* An existing Amazon Connect instance
* Access to the following AWS services:
    * AWS Identity and Access Management (IAM) with access to create policies and roles
    * AWS Lambda with access to create functions

## Deploy Lambda Function

1. Create a Lambda function with Node.js 18.x runtime.
2. Copy and paste the code in [lambdaFunction.js](./lambdaFunction.js) to your Lambda function.
3. This Lambda function will control recording funtionality and will complete 4 actions (START, STOP, PAUSE, RESUME). You must pass the following parameters from Amazon Connect in your contact flow using the [Invoke AWS Lambda function block](https://docs.aws.amazon.com/connect/latest/adminguide/invoke-lambda-function-block.html):
    1. operation = ````START````, ````STOP````, ````PAUSE````, ````RESUME````
    2. contactId = taken from event details
    3. initialContactId = which is stored on the original contact as an attribute to be used in case the call is transferred multiple times
    4. voiceRecordingTrack = what part of the call you want to record (only used for START) ````TO_AGENT````, ````FROM_AGENT````, ````ALL````
4. Add ````INSTANCE_ID```` as an environment variable on your Lambda function.
5. This Lambda function must have an IAM role assigned with access the following Amazon Connect APIs: ````StartContactRecording````, ````StopContactRecording````, ````PauseContactRecording````, ````ResumeContactRecording````
6. [Add your Lambda Function to your Amazon Connect instance](https://docs.aws.amazon.com/connect/latest/adminguide/connect-lambda-functions.html#add-lambda-function)

## Deploy Contact Flows

#### Inbound Flow
1. You must enable recording in your inbound flow using the [Set recording and analytics behavior block](https://docs.aws.amazon.com/connect/latest/adminguide/set-recording-behavior.html).
2. The following attributes must be assigned in your inbound flow:
    1. initialContactId = System > InitialContactId
    2. callRecordingStatus = ON or OFF
    3. callRecordingHTML = 
        1. ````<p style='display: inline-block;color:green'>RECORDING ⬤</p>````
        2. ````<p style='display: inline-block;color:red'>NOT RECORDING ⬤</p>````
        3. You will set this up to help agents keep track of what status of call recording. This will be displayed in their agent workspace.
3. You must set your Default for Agent UI in the **[SetEventFlow block](https://docs.aws.amazon.com/connect/latest/adminguide/set-event-flow.html)** to specify the flow to run when the agent accepts the call.

#### Step-by-step Guide Flow
1. Import **[this contact flow](./contactFlow.json)** into your Amazon Connect instance.
2. Add your Lambda function to the [Invoke AWS Lambda function block](https://docs.aws.amazon.com/connect/latest/adminguide/invoke-lambda-function-block.html) in your contact flow.
3. Update **AttributeBar** in your [ShowView block](https://docs.aws.amazon.com/connect/latest/adminguide/show-view-block.html) to align with business requirements.

## Testing
1. Open the Agent Workspace.
2. Make a test call to the phone number with your inbound flow associated to it.

## Screenshots

![Start Stop Pause Resume Recording - Screenshot 1](https://d1khg2kbc0gpyh.cloudfront.net/sbsgithub/image6.png)

![Start Stop Pause Resume Recording - Screenshot 2](https://d1khg2kbc0gpyh.cloudfront.net/sbsgithub/image7.png)

