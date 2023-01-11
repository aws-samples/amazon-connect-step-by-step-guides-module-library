/*
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
  const formData = JSON.parse(dataFromViews.ViewResultData).ActionOutput.formData;
  console.log("dataFromViews: ", dataFromViews)
  console.log("form data: ", formData);
  
  const simplifiedFormData = {
      'PolicyID': formData.policyID,
      'Incident': formData.incident[0],
      'Location': formData.location[0],
      'Date': formData.date,
      'LocationOfDamage': formData.locationOfDamage[0],
      'OnPolicy': formData.onPolicy,
      'Expedited': formData.expedited
  }
  
  return simplifiedFormData
};