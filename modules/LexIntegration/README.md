# **Amazon Lex Integration**

**Description**

The Amazon Lex integration module provides a basic integration between Amazon Lex and your step-by-step guides. There is a a View contact flow that defines the step-by-step guide for the agent and a handler flow that includes the Lex bot where the user will interact with the bot. There is one sample Lex bot that you can export to test this module. The user will input information using Amazon Lex, then that information would be sent to the agent in a Details View format. Learn more about [integrating Amazon Lex with Amazon Connect.](https://docs.aws.amazon.com/connect/latest/adminguide/amazon-lex.html)

**User Defined Attributes**

You'll need DefaultFlowForAgentUI: contact flow ID. The contact flow to use to display a step-by-step guide to the agent when they initially connect to the contact. For this module the contact flow ID should correspond with the SBS_Lex_Integration.json found within this folder.

**Use Case**

The user will call or use the test chat function to the Handler Flow where they will be directed to the Lex bot. The user will attempt to cancel their flight using utterances, such as "I need to cancel my flight", "How can I cancel my flight?", or "cancel flight". The user will then be prompted with a series of questions that will provide relevant information to the agent. The information the user inputs will be sent to the agent using the SBS\_Lex\_Integration flow. The user will be put in a queue, while the agent can see the information and cancel their flight. You can now see how to pass information from a Lex bot to step-by-step guides.

**How to use**

1. To use this module we first want to import/export the **CustomerAirlineSupport** Bot found in this folder. You can find more information on how to [import/export a Lex Bot.](https://docs.aws.amazon.com/lexv2/latest/dg/importing-exporting.html)
2. Navigate to /Bot versions/Draft version/All languages/English (US) in the left hand menu within the Amazon Lex console. Click the Build button and wait for the bot to complete building.
3. We then need to give our Amazon Connect instance permission to use the Amazon Lex Bot. To do this read[Add the Amazon Lex bot to your Amazon Connect instance](https://docs.aws.amazon.com/connect/latest/adminguide/amazon-lex.html).
4. Then we need to import the SBS\_Lex\_Integration flow. Start by downloading the SBS\_Lex\_Integration, then import the flow. Here is how to [import/export contact flows](https://docs.aws.amazon.com/connect/latest/adminguide/contact-flow-import-export.html). Once you import the flow, hit **Publish**. Copy the contact flow ID. This value is everything after _contact-flow/_ in the contact flow ARN. See [here](https://docs.aws.amazon.com/connect/latest/adminguide/find-contact-flow-id.html) for more detailed instructions.
5. Next, we need to download SBS\_Lex\_Integration\_Handler flow then import the flow.
6. Update the **Get Customer Input** block with the **CustomerAirlineSupport** bot. Here is more on how to Create a flow and add your Amazon Lex bot.
7. Within the handler flow set the DefaultFlowForAgentUI attribute value as the contact flow ID you copied if you want the example guide to appear when the agent first connects with the contact.
8. Click **Save**
9. Click **Publish**

Once you have finished the implementation steps you can run the example as follows:

1. Log into your [agent workspace](https://docs.aws.amazon.com/connect/latest/adminguide/agent-user-guide.html).
2. In a separate tab open your Amazon Connect instance and connect the handler flow you created during the implementation to a phone number (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/tutorial1-assign-contact-flow-to-number.html)) or within a test chat (see [here](https://docs.aws.amazon.com/connect/latest/adminguide/chat-testing.html#test-chat)).
3. Initiate a new contact by calling the phone number you used in the previous step. When you call or use the test chat feature, you will be prompted with "Hi, welcome to the airline customer support, how can I help you?". You can respond using a variety of sample utterances such as: "cancel flight", "I need help cancelling my flight", "How can I cancel my flight?",and "Please help me cancel my flight. From there you will be promted to enter your first name, last name, destination city, arrival city, and confirmation number. 
4. Accept the contact within your agent workspace tab.
5. The step-by-step guide you set using the DefaultFlowForAgentUI attribute should appear immediately. 
