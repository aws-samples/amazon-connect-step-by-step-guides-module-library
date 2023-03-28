/*!
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0

  This Lambda serves as an example for how we can pass data from a SBSGuides View
  to AWS Lambda. From the AWS Lambda function we can perform various processes on
  the data such as save it to a database or trigger an event.

  In this function, the View data is stored in event.Details.Parameters.dataFromViews object.
  We extract the relevant datapoints that we want from this object (i.e. the values the agent
  provided while filling out the form) and return a single-level JSON object called containing
  those values (simplifiedFormData).

  We can access this returned JSON object in the contact flow using the $.External namespace.
*/

export const handler = async(event) => {
  console.log("EVENT",event)
  const dataFromViews = event.Details.Parameters.dataFromViews;
  const formData = JSON.parse(dataFromViews.ViewResultData).FormData;
  console.log("dataFromViews: ", dataFromViews)
  console.log("form data: ", formData);

  const simplifiedFormData = {};
  Object.entries(formData).forEach((entry) => {
    const [key, value] = entry;
    console.log(`${key} ${value}`);
    if (typeof value === 'string') {
      simplifiedFormData[key] = value;
    }
    else if (typeof value === 'object') {
      simplifiedFormData[key] = value[0];
    }
    else {
      throw console.error("Unknown type for value: " (typeof value));
    }
  })

  console.log("SimplifiedFormData: ", JSON.stringify(simplifiedFormData))
  
  return simplifiedFormData
};
