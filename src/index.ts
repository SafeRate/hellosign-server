require("dotenv").config();
import { sendLetterOfExplanationSignatureRequest } from "./hellosign";

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

const hellosignTest = async () => {
  // hellosignTestLOX();
};

hellosignTest();
