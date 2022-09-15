import { env } from "./env";
import * as HelloSignSDK from "hellosign-sdk";
const api = new HelloSignSDK.SignatureRequestApi();

// Configure HTTP basic authorization: api_key
api.username = env.HELLOSIGN_API_KEY;
enum HelloSignTemplates {
  AddendumToPurchaseContract = "7534aecf7c78e4642aa4e03b8f15d2c23aadb606",
  LetterOfExplanation = "15418b8d920a430f19e8fc3a9e75e8cefbbbb9c7",
  PurchaseContract = "",
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
