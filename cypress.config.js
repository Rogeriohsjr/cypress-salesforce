const { defineConfig } = require("cypress");

// Read baseUrl from environment variable or use a default for development
const baseUrl = process.env.CYPRESS_BASE_URL || "";

module.exports = defineConfig({
  chromeWebSecurity: false,
  experimentalSessionAndOrigin: true,
  // this flag makes the App Builder Editor to work in LEX.
  experimentalModifyObstructiveThirdPartyCode: true,
  env: {
    sf_loginType: process.env.CYPRESS_SF_LOGIN_TYPE || "SFDX", //SOAP or SessionId or OAuth or SFDX
    sf_username: process.env.CYPRESS_SF_USERNAME || "",
    sf_password: process.env.CYPRESS_SF_PASSWORD || "",
    sf_instanceUrl: process.env.CYPRESS_SF_INSTANCE_URL || "",
    sf_sessionId: process.env.CYPRESS_SF_SESSION_ID || "",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // Check if baseUrl is set from environment variable
      if (process.env.CYPRESS_BASE_URL) {
        config.baseUrl = process.env.CYPRESS_BASE_URL;
      }
      return config;
    },
    baseUrl,
  },
});
