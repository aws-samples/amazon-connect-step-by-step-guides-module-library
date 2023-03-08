/*
  This Lambda serves as an example for how we can pass data from a SBSGuides View
  to AWS Lambda in order to process and simplify form data to be referenceable in
  a contact flow
  
  We can access this returned JSON object in the contact flow using the $.External namespace.
*/

export const handler = async(event) => {
  console.log("EVENT",event)
  const dataFromViews = event.Details.Parameters.dataFromViews;
  const formData = JSON.parse(dataFromViews.ViewResultData).FormData;
  console.log("dataFromViews: ", dataFromViews)
  console.log("form data: ", formData);
  
  const simplifiedFormData = {
      'CaseTitle': formData.caseTitle,
      'CaseSummary': formData.caseSummary
  }
  
  return simplifiedFormData
};
