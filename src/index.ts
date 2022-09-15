require("dotenv").config();
import {
  sendLetterOfExplanationSignatureRequest,
  sendPurchaseContractAddendumRequest,
} from "./hellosign";

const hellosignTestLOX = async () => {
  const result = await sendLetterOfExplanationSignatureRequest(
    {
      firstName: "Dylan",
      lastName: "Hall",
      email: "dylhallan@gmail.com",
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
        email: "dylhallan@gmail.com",
      },
    ],
    "2022-09-15",
    [
      {
        firstName: "Neon",
        lastName: "Hall",
        email: "dylhallan@gmail.com",
      },
    ]
  );
};

const hellosignTest = async () => {
  // await hellosignTestLOX();
  await helloSignTestPurchaseAddenda();
};

hellosignTest();
