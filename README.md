# Getting started with Step-By-Step Guides components

**IMPORTANT: Step-by-step guides are currently in preview. As such it is subject to change prior to release. You must get your instance approved to use step-by-step guides before you can take advantage of this feature**

## Introduction
With [step-by-step guides for the Amazon Connect agent workspace](https://docs.aws.amazon.com/connect/latest/adminguide/agent-workspace.html), companies can provide customizable experiences for their agents, enabling them to deliver exceptional service from the first day on the job. Contact center administrators can now create no-code, UI based workflows to guide agents through common situation such as making reservations, managing payments, and submitting new orders. Administrators can set up step-by-step guides to appear in the Amazon Connect agent workspace or embedded within their own homegrown applications. Step-by-step guides dynamically guide the agent through the life of a customer service request, ensuring the agent never has to guess or rely on past experience to know what comes next.
 
While step-by-step guides are designed to be flexible for your specific usecase, there are specific design patterns that will be common throughout all guides. For instance, every time a dropdown list appear in your guide, the same standard JSON schema will be used to define it.

To help accelerate addoption, this repository serves as a central library to provide templates and examples for common components and design patterns for using step-by-step guides within your Amazon Connect agent workspace. Continue reading to learn how to best use this library to meet your specific use case.

## Prerequisites
This library is designed specifically for Amazon Connect contact center administrators interested in creating step-by-step guides for their contact center agents. To get the most out of this library you are expected to:
- Have an Amazon Connect instance with step-by-step guides enabled. To get access to the preview reach out to AWS support or your AWS point of contact.
- Working knowledge of Amazon Connect Contact Flows and queues.
- Working knowledge of the JSON object format. To learn more see [this tutorial](https://www.w3schools.com/js/js_json_intro.asp).

## What is in the library?
This library is divided into two parts: modules, and examples.

### Modules
Within the Modules folder are subfolders for commonly used patterns that will appear in your contact flows when using step-by-step guides, such as initiating a step-by-step guide and using step-by-step guides with Customer Profiles. Each subfolder consists of a `contactFlow.json` which can be imported into your Amazon Connect instance to see how the pattern is implemented. There is also a `README.md` which provides details about the pattern, why we want to use this pattern, how to use the pattern within the context of a larger contact flow, and other relevant information pertaining to the pattern.

### Examples
Within the Examples folder are subfolders showcasing complete implementations of a step-by-step guide. For instance, you can see how to use step-by-step guides to implement post-call disposition code collection or schedule a task based on the results of a guide. Each subfolder consists of a `contactFlow.json` which can be imported into your Amazon Connect instance to deploy the example. There is also a `README.md` which provides details about the example, an in-depth implementation guide, and how to extend the example to meet your specific use case.

## Where can I find more documentation?
To learn more about step-by-step guides for the Amazon Connect agent workspace check out the official documentation [here](https://docs.aws.amazon.com/connect/latest/adminguide/agent-workspace.html).

If you prefer learning by example checkout the [Getting started with step-by-step guides for the Amazon Connect agent workspace](https://aws.amazon.com/blogs/contact-center/getting-started-with-step-by-step-guides-for-the-amazon-connect-agent-workspace/) blog post.

## License Summary
[TBD]