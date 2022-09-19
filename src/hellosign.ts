import { env } from "./env";
import numeral from "numeral";
import * as HelloSignSDK from "hellosign-sdk";

const api = new HelloSignSDK.SignatureRequestApi();

// Configure HTTP basic authorization: api_key
api.username = env.HELLOSIGN_API_KEY;
enum HelloSignTemplates {
  AddendumToPurchaseContract = "7534aecf7c78e4642aa4e03b8f15d2c23aadb606",
  LetterOfExplanation = "15418b8d920a430f19e8fc3a9e75e8cefbbbb9c7",
  PurchaseContract = "3bfd7838c631201e9c2fd62f203870e9d63820c3",
}

export type Signer = {
  firstName: string;
  lastName: string;
  email: string;
};

export type Address = {
  streetAddress: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
};

export const sendLetterOfExplanationSignatureRequest = async (
  signer: Signer,
  address: Address,
  explanation: string,
  cosigners: Signer[]
) => {
  const mainSigner: HelloSignSDK.SubSignatureRequestTemplateSigner = {
    role: "Signer",
    emailAddress: signer.email,
    name: `${signer.firstName} ${signer.lastName}`,
  };

  const customField1: HelloSignSDK.SubCustomField = {
    editor: "Signer",
    name: "Address",
    value: `${address.streetAddress}${
      address.address2 ? " " + address.address2 : ""
    }, ${address.city}, ${address.state} ${address.zipCode}`,
    required: true,
  };

  const customField2: HelloSignSDK.SubCustomField = {
    editor: "Signer",
    name: "Explanation",
    value: explanation,
    required: true,
  };

  const signingOptions: HelloSignSDK.SubSigningOptions = {
    draw: true,
    type: true,
    upload: true,
    phone: false,
    defaultType: HelloSignSDK.SubSigningOptions.DefaultTypeEnum.Draw,
  };

  const data: HelloSignSDK.SignatureRequestSendWithTemplateRequest = {
    templateIds: [HelloSignTemplates.LetterOfExplanation],
    // subject: "Purchase Order",
    // message: "Glad we could come to an agreement.",
    signers: [mainSigner],
    customFields: [customField1, customField2],
    signingOptions,
    testMode: true,
  };

  try {
    const result = await api.signatureRequestSendWithTemplate(data);
    console.log(result);
  } catch (error: any) {
    console.log("Exception when calling HelloSign API:");
    console.log(error.body);
  }
};

function parseDate(dateStr: string) {
  const components = dateStr.split("-");

  let returnDay,
    returnMonth,
    returnYear = "";

  if (components.length === 3) {
    returnYear = components[0].slice(-2);
    returnDay = `${parseInt(components[2])}`;

    const month = parseInt(components[1]);

    if (month === 1) {
      returnMonth = "January";
    } else if (month === 2) {
      returnMonth = "February";
    } else if (month === 3) {
      returnMonth = "March";
    } else if (month === 4) {
      returnMonth = "April";
    } else if (month === 5) {
      returnMonth = "May";
    } else if (month === 6) {
      returnMonth = "June";
    } else if (month === 7) {
      returnMonth = "July";
    } else if (month === 8) {
      returnMonth = "August";
    } else if (month === 9) {
      returnMonth = "September";
    } else if (month === 10) {
      returnMonth = "October";
    } else if (month === 11) {
      returnMonth = "November";
    } else if (month === 12) {
      returnMonth = "December";
    }
  }

  if (returnDay === "") {
    return { monthDay: "", year2digit: "" };
  } else {
    return { monthDay: `${returnMonth} ${returnDay}`, year2digit: returnYear };
  }
}

export const sendPurchaseContract = async (data: any) => {
  const signers: HelloSignSDK.SubSignatureRequestTemplateSigner[] = [];

  signers.push({
    role: "Buyer1",
    emailAddress: data.buyerEmailAddress,
    name: `${data.buyerFirstName} ${data.buyerLastNme}`,
  });

  delete data.buyerFirstName, data.buyerLastName, data.buyerEmailAddress;

  signers.push({
    role: "Seller1",
    emailAddress: data.sellerEmailAddress,
    name: `${data.sellerFirstName} ${data.sellerLastNme}`,
  });

  delete data.sellerFirstName, data.sellerLastName, data.sellerEmailAddress;

  signers.push({
    role: "BuyerAgent",
    emailAddress: data.buyerAgentEmailAddress,
    name: `${data.buyerAgentFirstName} ${data.buyerAgentLastNme}`,
  });

  delete data.buyerAgentFirstName,
    data.buyerAgentLastName,
    data.buyerAgntEmailAddress;

  signers.push({
    role: "SellerAgent",
    emailAddress: data.sellerAgentEmailAddress,
    name: `${data.sellerAgentFirstName} ${data.sellerAgentLastNme}`,
  });

  delete data.sellerAgentFirstName,
    data.sellerAgentLastName,
    data.sellerAgntEmailAddress;

  if (data.notAcceptedDate) {
    const dateVals = parseDate(data.notAcceptedDate);
    data.notAcceptedDayMonth = dateVals.monthDay;
    data.notAcceptedYear = dateVals.year2digit;
    delete data.notAcceptedDate;
  }

  if (data.mortageCommitmentDate) {
    const dateVals = parseDate(data.mortageCommitmentDate);
    data.mortgageContingencyDayMonth = dateVals.monthDay;
    data.mortgageContingencyYear = dateVals.year2digit;
    delete data.mortageCommitmentDate;
  }

  if (data.closingDate) {
    const dateVals = parseDate(data.closingDate);
    data.closingMonthDay = dateVals.monthDay;
    data.closingYear = dateVals.year2digit;
    delete data.closingDate;
  }

  if (data.offerDate) {
    const dateVals = parseDate(data.offerDate);
    data.offerMonthDay = dateVals.monthDay;
    data.offerYear = dateVals.year2digit;
    delete data.offerDate;
  }

  if (data.acceptanceDate) {
    const dateVals = parseDate(data.acceptanceDate);
    data.acceptanceMonthDay = dateVals.monthDay;
    data.acceptanceYear = dateVals.year2digit;  
    delete data.acceptanceDate;
  }

  if (data.hasOwnProperty('purchasePrice')) {
    data.purchasePrice = numeral(data.purchasePrice).format('$0,0.00');
  }

  if (data.hasOwnProperty('squareFootage')) {
    data.squareFootage = numeral(data.squareFootage).format('0,0');
  }  

  if (data.hasOwnProperty('initialEarnestAmount')) {
    data.initialEarnestAmount = numeral(data.initialEarnestAmount).format('$0,0.00');
  }

  if (data.hasOwnProperty('finalEarnestMoneyType')) {
    if (data.finalEarnestMoneyType === '%') {
      data.finalEarnestMoneyIsPercent = true;
      data.finalEarnestMoneyIsAmount = false;
      data.finalEarnestMoneyAmount = numeral(data.finalEarnestMoneyAmount).format('0,0.00');      
    } else {
      data.finalEarnestMoneyIsPercent = false;
      data.finalEarnestMoneyIsAmount = true;
      data.finalEarnestMoneyAmount = numeral(data.finalEarnestMoneyAmount).format('$0,0.00');     
    }
    delete data.finalEarnestMoneyType;
  }

  if (data.hasOwnProperty('loanAmountType')) {
    if (data.loanAmountType === '%') {
      data.isLoanAmount = false;
      data.isLoanLTV = true;
      data.loanLTV = numeral(data.loanLTV).format('0,0.00');      
    } else {
      data.isLoanAmount = true;
      data.isLoanLTV = false;
      data.loanAmount = numeral(data.loanAmount).format('$0,0.00');     
    }
    delete data.loanAmountType;
  }

  if (data.mortgageInterestRate) {
    data.mortgageInterestRate = numeral(data.mortgageInterestRate).format('0,0.000');
  }

  if (data.loanFeeNotToExceed) {
    data.loanFeeNotToExceed = numeral(data.loanFeeNotToExceed).format('0,0.000');
  }

  if (data.hasOwnProperty('closingCostType')) {
    if (data.closingCostType === '%') {
      data.closingCostCreditIsAmount = false;
      data.closingCostCreditIsPercent = true;
      data.closingCostPercent = numeral(data.closingCostPercent).format('0,0.00');      
    } else {
      data.closingCostCreditIsAmount = true;
      data.closingCostCreditIsPercent = false;
      data.closingCostAmount = numeral(data.closingCostAmount).format('$0,0.00');     
    }
    delete data.closingCostType;
  }

  if (data.hasOwnProperty('useOccupancyPayments')) {
    data.useOccupancyPayments = numeral(data.useOccupancyPayments).format('$0,0.00');
  }

  if (data.hasOwnProperty('realEstateTaxes')) {
    data.realEstateTaxes = numeral(data.realEstateTaxes).format('$0,0.00');
  }

  if (data.hasOwnProperty('propertyTaxProrated')) {
    data.propertyTaxProrated = numeral(data.propertyTaxProrated).format('0,0.000');
  }  

  if (data.hasOwnProperty('hoaAssessment')) {
    data.hoaAssessment = numeral(data.hoaAssessment).format('$0,0.00');
  }

  if (data.hasOwnProperty('specialAssessment')) {
    data.specialAssessment = numeral(data.specialAssessment).format('$0,0.00');
  }

  if (data.hasOwnProperty('outstandingAssessment')) {
    data.outstandingAssessment = numeral(data.outstandingAssessment).format('$0,0.00');
  }

  if (data.hasOwnProperty('specialAssessmentYes')) {
    data.specialAssessmentNo = !(data.specialAssessmentYes);
  }

  if (data.hasOwnProperty('outstandingAssessmentDue')) {
    data.outstandingAssessmentNotDue = !data.outstandingAssessmentDue;
  }

  if (data.hasOwnProperty('disclosureILRealPropertyYes')) {
    data.disclosureILRealPropertyNo = !data.disclosureILRealPropertyYes;    
  }

  if (data.hasOwnProperty('disclosureHeatYes')) {
    data.disclosureHeatNo = !data.disclosureHeatYes;    
  }
  
  if (data.hasOwnProperty('disclosureLeadYes')) {
    data.disclosureLeadNo = !data.disclosureLeadYes;    
  }
  
  if (data.hasOwnProperty('disclosureRadonYes')) {
    data.disclosureRadonNo = !data.disclosureRadonYes;    
  }
  
  if (data.hasOwnProperty('disclosureMoldYes')) {
    data.disclosureMoldNo = !data.disclosureMoldYes;    
  }  

  const dataKeys = Object.keys(data);
  const customFields = [];
  for (let dk = 0; dk < dataKeys.length; dk++) {
    const dataKey = dataKeys[dk];

    let editor = "BuyerAgent";

    if (dataKey.startsWith('buyerAgent') {
      editor = "BuyerAgent";
    } else if (dataKey.startsWith('buyer')) {
      editor = "Buyer1";
    } else if (dataKey.startsWith('sellerAgent')) {
      editor = "SellerAgent";
    } else if (dataKey.startsWith('seller')) {
      editor = "Seller1";
    }

    customFields.push({
      editor,
      name: dataKey,
      value: data[dataKey],
      required: false,
    });
  }

  const signingOptions: HelloSignSDK.SubSigningOptions = {
    draw: true,
    type: true,
    upload: true,
    phone: false,
    defaultType: HelloSignSDK.SubSigningOptions.DefaultTypeEnum.Draw,
  };  

  const helloSignData: HelloSignSDK.SignatureRequestSendWithTemplateRequest = {
    templateIds: [HelloSignTemplates.PurchaseContract],
    // subject: "Purchase Order",
    // message: "Glad we could come to an agreement.",
    signers: signers,
    customFields: customFields,
    signingOptions,
    testMode: true,
  };

  try {
    const result = await api.signatureRequestSendWithTemplate(data);
    console.log(result);
  } catch (error: any) {
    console.log("Exception when calling HelloSign API:");
    console.log(error.body);
  }  
};

export const sendPurchaseContractAddendumRequest = async (
  addenda: string[],
  address: Address,
  buyers: Signer[],
  contractDate: string,
  sellers: Signer[]
) => {
  const signers: HelloSignSDK.SubSignatureRequestTemplateSigner[] = [];

  for (let b = 0; b < buyers.length; b++) {
    const buyer = buyers[b];
    signers.push({
      role: `Buyer${b + 1}`,
      emailAddress: buyer.email,
      name: `${buyer.firstName} ${buyer.lastName}`,
    });
  }

  for (let s = 0; s < sellers.length; s++) {
    const seller = sellers[s];
    signers.push({
      role: `Seller${s + 1}`,
      emailAddress: seller.email,
      name: `${seller.firstName} ${seller.lastName}`,
    });
  }

  const customFieldContractDate: HelloSignSDK.SubCustomField = {
    editor: "Sender",
    name: "ContractDate",
    value: contractDate,
    required: true,
  };

  const customFieldPropertyAddress: HelloSignSDK.SubCustomField = {
    editor: "Sender",
    name: "PropertyAddress",
    value: `${address.streetAddress}${
      address.address2 ? " " + address.address2 : ""
    }, ${address.city}, ${address.state} ${address.zipCode}`,
    required: true,
  };

  let addendaStr = `\n1. ${addenda[0]}`;
  for (let a = 1; a < addenda.length; a++) {
    addendaStr = `${addendaStr}\n\n${a + 1}. ${addenda[a]}`;
  }

  const customFieldAddenda: HelloSignSDK.SubCustomField = {
    editor: "Sender",
    name: "Addenda",
    value: addendaStr,
    required: true,
  };

  const signingOptions: HelloSignSDK.SubSigningOptions = {
    draw: true,
    type: true,
    upload: true,
    phone: false,
    defaultType: HelloSignSDK.SubSigningOptions.DefaultTypeEnum.Draw,
  };

  const data: HelloSignSDK.SignatureRequestSendWithTemplateRequest = {
    templateIds: [HelloSignTemplates.AddendumToPurchaseContract],
    // subject: "Purchase Order",
    // message: "Glad we could come to an agreement.",
    signers: signers,
    customFields: [
      customFieldContractDate,
      customFieldPropertyAddress,
      customFieldAddenda,
    ],
    signingOptions,
    testMode: true,
  };

  try {
    const result = await api.signatureRequestSendWithTemplate(data);
    console.log(result);
  } catch (error: any) {
    console.log("Exception when calling HelloSign API:");
    console.log(error.body);
  }
};
