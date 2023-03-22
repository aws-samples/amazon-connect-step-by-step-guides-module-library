/*!
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0

  This Lambda serves as an example for how we can pass data from a Lambda function to
  an SBS Guides view. We can use the AWS Lambda function to pull data from various
  sources and send that data to the Amazon Connect instance to display it to the
  agent using SBS Guides views.

  In this function, we generate some sample data and store it in a JSON object called
  sampleData that we return at the end of our function. We can access this returned
  JSON object within a contact flow using the $.External namespace.
*/

export const handler = async(event) => {
  console.log("EVENT",event);
  
  // This data can be replaced with any other data so long as it is a 
  // single-level JSON object
  const sampleData = {
      'Date': new Date().toString(),
      'PolicyNumber': 123456,
      'CustomerName': "Sample Customer",
      'CustomMessage': "Hi from AWS Lambda"
  };
  
  return sampleData;
};