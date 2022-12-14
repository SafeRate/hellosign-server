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
    buyerAddress: "900 S Clark St Apt 1415",
    buyerAgentAddress: "900 N Michigan Ave",
    buyerAgentBrokerageCompanyName: "Dylan Realty",
    buyerAgentBrokerageLicenseNumber: "0452956",
    buyerAgentBrokerageMLSNumber: "02030303",
    buyerAgentCity: "Chicago",
    buyerAgentEmailAddress: "dylan@saferate.com",
    buyerAgentFirstName: "Dylan",
    buyerAgentLastName: "Agent",
    buyerAgentLicenseNumber: "50505121",
    buyerAgentMLSNumber: "123456789",
    buyerAgentState: "IL",
    buyerAgentZipCode: "60601",
    buyerAttorneyAddress: "2804 N Hoyne",
    buyerAttorneyCity: "Chicago",
    buyerAttorneyEmailAddress: "attorneymcgee@attorneygroup.com",
    buyerAttorneyFirstName: "Attorney",
    buyerAttorneyLastName: "McGee",
    buyerAttorneyState: "IL",
    buyerAttorneyZipCode: "61820",
    buyerCellPhone: "217-638-0869",
    buyerCity: "Chicago",
    buyerEmailAddress: "dylhallan@gmail.com",
    buyerFirstName: "Dylan",
    buyerLastName: "Hall",
    buyerState: "IL",
    buyerZipCode: "60615",
    closingCostAmount: 1000,
    closingCostType: "$ amount",
    closingDate: "2022-11-01",
    disclosureHeatYes: true,
    disclosureILRealPropertyYes: true,
    disclosureLeadYes: true,
    disclosureMoldYes: false,
    disclosureRadonYes: true,
    escrowee: "Shima Realty",
    finalEarnestMoneyAmount: 3,
    finalEarnestMoneyBusinessDays: 3,
    finalEarnestMoneyType: "%",
    hasDishwasher: true,
    hasDryer: false,
    hasGarbageDisposal: true,
    hasLightingFixtures: true,
    hasMicrowave: true,
    hasOven: true,
    hasRefrigerator: true,
    hasSmokeDetectors: true,
    hasSumpPump: false,
    hasTrashCompactor: false,
    hasWasher: false,
    hasWaterSoftener: false,
    hoaAssessment: 653,
    hoaDocumentsDueDays: 5,
    initialEarnestAmount: 3000,
    initialEarnestForm: "Check",
    inspectionPeriod: 6,
    loanAmount: 240000,
    loanAmountType: "$ amount",
    mortgageCommitmentDate: "2022-10-17",
    mortgageInterestRate: 5,
    mortgageLender: "Safe Rate Lending",
    mortgageLenderAddress: "515 N State St, Floor 13",
    mortgageLenderCellPhone: "312-248-0234",
    mortgageLenderCity: "Chicago",
    mortgageLenderEmail: "team@saferate.com",
    mortgageLenderFax: "312-535-7089",
    mortgageLenderOfficePhone: "312-248-0234",
    mortgageLenderState: "IL",
    mortgageLenderZipCode: "60654",
    mortgageYear: 30,
    notAcceptedDate: "2022-10-07",
    offerDate: "2022-09-19",
    parkingIndoor: true,
    parkingLimitedCommon: true,
    propertyAddress: "211 E Ohio St Apt 510, Chicago, IL 60611",
    propertyPIN: "17-10-209-025-1015",
    propertyTaxAmount: 4359.53,
    propertyTaxExemptionsHomeowner: true,
    propertyTaxYear: "2021",
    purchasePrice: 300000,
    sellerAddress: "5050 S Lake Shore Dr",
    sellerAgentAddress: "125 S Clark St",
    sellerAgentBrokerageCompanyName: "Shima Realty",
    sellerAgentBrokerageLicenseNumber: "897234897324",
    sellerAgentBrokerageMLSNumber: "125498234987",
    sellerAgentCity: "Chicago",
    sellerAgentEmailAddress: "shima@saferate.com",
    sellerAgentFirstName: "Shima",
    sellerAgentLastName: "Agent",
    sellerAgentLicenseNumber: "128912892",
    sellerAgentMLSNumber: "23023402340",
    sellerAgentState: "IL",
    sellerAgentZipCode: "60601",
    sellerAttorneyAddress: "4343 W Division St",
    sellerAttorneyCity: "Chicago",
    sellerAttorneyEmailAddress: "farsiattorney@attorneygroup.com",
    sellerAttorneyFirstName: "Farsi",
    sellerAttorneyLastName: "Attorney",
    sellerAttorneyState: "IL",
    sellerAttorneyZipCode: "60623",
    sellerCellPhone: "301-395-1000",
    sellerCity: "Chicago",
    sellerEmailAddress: "srayej@gmail.com",
    sellerFirstName: "Shima",
    sellerLastName: "Rayej",
    sellerState: "IL",
    sellerZipCode: "60611",
    squareFootage: "1000",
    storageLimitedCommon: true,
    useOccupancyPayments: 74.54,
  });
};

const hellosignTest = async () => {
  // await hellosignTestLOX();
  // await helloSignTestPurchaseAddenda();
  await helloSignTestPurchaseContract();
};

hellosignTest();
