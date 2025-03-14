const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  experimentalSessionAndOrigin: true,
  // this flag makes the App Builder Editor to work in LEX.
  experimentalModifyObstructiveThirdPartyCode: true,
  env: {
    sf_loginType: "SOAP", //SOAP or SessionId
    sf_username: "x",
    sf_password: "x",
    sf_instanceUrl: "https://login.salesforce.com",
    sf_sessionId: "x",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "x",
  },
});
