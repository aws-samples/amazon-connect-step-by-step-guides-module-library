/*!
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0

  This Lambda serves as an example for how we can pass data from a SBSGuides View
  to AWS Lambda. From the AWS Lambda function we can perform various processes on
  the data such as save it to a database or trigger an event.

  In this function, the View data is stored in event.Details.Parameters.dataFromViews object.
  To show how the data is formatted we log the Event JSON object and various sub-objects.
*/

export const handler = async(event) => {
  console.log("EVENT: ",event)
  const dataFromViews = event.Details.Parameters.dataFromViews;
  const formData = JSON.parse(dataFromViews.ViewResultData).FormData;
  console.log("Data From Views: ", dataFromViews)

  return null;
}