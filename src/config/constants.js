const { REACT_APP_BASIC_AUTH_USERNAME, REACT_APP_BASIC_AUTH_PASSWORD } =
  process.env;
// const hasToken = localStorage.getItem("sToken");

export const headersConfig = {
  language: "en",
  offset: -330,
  platform: 3,
  timezone: "Asia/Calcutta",
  api_key: 1234,
};

export const basicAuthConfig = {
  Authorization: `Basic ${btoa(
    `${REACT_APP_BASIC_AUTH_USERNAME}:${REACT_APP_BASIC_AUTH_PASSWORD}`
  )}`,
};

// export const bearerAuthConfig = {
//   Authorization: `Bearer ${hasToken}`,
// };
