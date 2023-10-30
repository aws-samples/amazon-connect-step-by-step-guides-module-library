# Getting started with Step-By-Step Guides components


## Introduction
With [step-by-step guides for the Amazon Connect agent workspace](https://docs.aws.amazon.com/connect/latest/adminguide/agent-workspace.html), companies can provide customizable experiences for their agents, enabling them to deliver exceptional service from the first day on the job. Contact center administrators can now create low-code, UI based workflows to guide agents through common situation such as making reservations, managing payments, and submitting new orders. Administrators can set up step-by-step guides to appear in the Amazon Connect agent workspace or embedded within their own homegrown applications. Step-by-step guides dynamically guide the agent through the life of a customer service request, ensuring the agent never has to guess or rely on past experience to know what comes next.
 
While step-by-step guides are designed to be flexible for your specific usecase, there are design patterns that will be common throughout all guides such as integration with [AWS Lambda](https://aws.amazon.com/lambda/) functions.

To help accelerate development, this repository serves as a central library to provide templates and examples for common design patterns with step-by-step guides. Continue reading to learn how to best use this library to meet your specific use case.

## Prerequisites
This library is designed specifically for Amazon Connect contact center administrators interested in creating step-by-step guides for their agents. To get the most out of this library you are expected to:
- Have an Amazon Connect instance account with [step-by-step guides enabled for your security profile](https://docs.aws.amazon.com/connect/latest/adminguide/enable-guided-experiences-sg.html).
- Working knowledge of Amazon Connect [flows](https://docs.aws.amazon.com/connect/latest/adminguide/concepts-contact-flows.html) and [queues](https://docs.aws.amazon.com/connect/latest/adminguide/concepts-queues-standard-and-agent.html).
- Working knowledge of the JSON object format. To learn more see [this tutorial](https://www.w3schools.com/js/js_json_intro.asp).

## What is in the library?
This library is divided into two parts: modules and examples.

### Modules
Within the Modules folder are subfolders for commonly used patterns that will appear in your contact flows when using step-by-step guides, such as [initiating a step-by-step guide](./modules/HandlerFlow/) and [using step-by-step guides with Amazon Connect Cases](./modules/Cases/) . Each subfolder has a `README.md` which provides details about the pattern, why we want to use this pattern, how to use the pattern within the context of a larger contact flow, and other relevant information.

### Examples
Within the Examples folder are subfolders showcasing complete implementations of a step-by-step guide. For instance, you can see how to use step-by-step guides to [implement post-call disposition code](./examples/DispositionCodes/) or [schedule and review tasks using a form](./examples/CreateAndReviewTask). Each subfolder contains a `README.md` which provides details about the example and an in-depth implementation guide.

## Where can I find more documentation?
To learn more about step-by-step guides for the Amazon Connect agent workspace check out the [official documentation](https://docs.aws.amazon.com/connect/latest/adminguide/agent-workspace.html).

If you prefer learning by example check out the [Getting started with step-by-step guides for the Amazon Connect agent workspace](https://aws.amazon.com/blogs/contact-center/getting-started-with-step-by-step-guides-for-the-amazon-connect-agent-workspace/) blog post.

| :bookmark_tabs: Guides Documentation                                                                        | 
|--------------------------------------------------------------------------------------------|
| Check out our official [Guides documentation](https://d2ote8qdyv1arb.cloudfront.net/?path=/story/overview--page) for more details on how to use Views along with JSON schemas for our UI and Form components. |
