require("dotenv").config();
import {
  sendLetterOfExplanationSignatureRequest,
  sendPurchaseContract,
  sendPurchaseContractAddendumRequest,
} from "./hellosign";

const hellosignTestLOX = async () => {
  const result = await sendLetterOfExplanationSignatureRequest(
    {
      firstName: "Dylan",
      lastName: "Hall",
      email: "dylan@saferate.com",
    },
    {
      streetAddress: "211 E Ohio St",
      address2: "Apt 510",
      city: "Chicago",
      state: "IL",
      zipCode: "60611",
    },
    "This is a letter of explanation explaining the explanation for the situation!",
    []
  );
};

const helloSignTestPurchaseAddenda = async () => {
  const result = await sendPurchaseContractAddendumRequest(
    ["Add credits of $6,000", "Remove the couch from the purchase contract"],
    {
      streetAddress: "211 E Ohio St",
      address2: "Apt 510",
      city: "Chicago",
      state: "IL",
      zipCode: "60611",
    },
    [
      {
        firstName: "Dylan",
        lastName: "Hall",
        email: "dylan@saferate.com",
      },
    ],
    "2022-09-15",
    [
      {
        firstName: "Neon",
        lastName: "Hall",
        email: "dylan@saferate.com",
      },
    ]
  );
};

const helloSignTestPurchaseContract = async () => {
  const result = await sendPurchaseContract({
    attorneyApprovalDays: 5,
    buyerAgentEmailAddress: "dylan@saferate.com",
    buyerAgentFirstName: "Dylan",
    buyerAgentLastName: "Agent",
    buyerEmailAddress: "dylhallan@gmail.com",
    buyerFirstName: "Dylan",
    buyerLastName: "Hall",
    closingDate: "2022-11-01",
    disclosureHeatYes: true,
    disclosureILRealPropertyYes: true,
    disclosureLeadYes: true,
    disclosureMoldYes: true,
    disclosureRadonYes: true,
    escrowee: "Shima Realty",
    finalEarnestMoneyAmount: 3,
    finalEarnestMoneyBusinessDays: 3,
    finalEarnestMoneyType: "%",
    hasDishwasher: true,
    hasDryer: true,
    hasGarbageDisposal: true,
    hasLightingFixtures: true,
    hasMicrowave: true,
    hasOven: true,
    hasRefrigerator: true,
    hasSmokeDetectors: true,
    hasSumpPump: true,
    hasTrashCompactor: true,
    hasWasher: true,
    hasWaterSoftener: true,
    hoaAssessment: 653,
    hoaDocumentsDueDays: 5,
    initialEarnestAmount: 3000,
    initialEarnestForm: "Check",
    inspectionPeriod: 6,
    mortageCommitmentDate: undefined,
    mortgageLender: "Safe Rate Lending",
    mortgageLenderAddress: "515 N State St, Floor 13",
    mortgageLenderCellPhone: "312-248-0234",
    mortgageLenderCity: "Chicago",
    mortgageLenderEmail: "team@saferate.com",
    mortgageLenderFax: "312-535-7089",
    mortgageLenderOfficePhone: "312-248-0234",
    mortgageLenderState: "IL",
    mortgageLenderZipCode: "60654",
    mortgageOriginatorFirstName: undefined,
    mortgageOriginatorLastName: undefined,
    notAcceptedDayMonth: "2022-10-01",
    offerDate: "2022-09-19",
    propertyAddress: "211 E Ohio St Apt 510",
    propertyPIN: "17-10-209-025-1015",
    propertyTaxAmount: 4359.53,
    propertyTaxExemptionsHomeowner: true,
    propertyTaxYear: "2021",
    purchasePrice: 300000,
    sellerAgentEmailAddress: "shima@perseeventures.com",
    sellerAgentFirstName: "Shima",
    sellerAgentLastName: "Agent",
    sellerEmailAddress: "srayej@gmail.com",
    sellerFirstName: "Shima",
    sellerLastName: "Rayej",
  });
};

const hellosignTest = async () => {
  await hellosignTestLOX();
  // await helloSignTestPurchaseAddenda();
  // await helloSignTestPurchaseContract();
};

hellosignTest();
