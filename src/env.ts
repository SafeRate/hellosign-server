type Env = {
  HELLOSIGN_API_KEY: string;
};

export const env: Env = {
  HELLOSIGN_API_KEY: process.env.HELLOSIGN_API_KEY
    ? process.env.HELLOSIGN_API_KEY
    : "",
};
