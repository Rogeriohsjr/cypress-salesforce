const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  //experimentalSessionAndOrigin: true,
  // this flag makes the App Builder Editor to work in LEX.
  experimentalModifyObstructiveThirdPartyCode: true,
  env: {
    sf_loginType: "SOAP", //SOAP or SessionId
    sf_username: "evm-qa-dev-test-mydomain@evolutemessage.com",
    sf_password: "hpm!gtv5gey0xbk4RDT94CgQUWxLJn8GqZpkbmDp3gb",
    sf_instanceUrl: "https://login.salesforce.com",
    sf_sessionId: "x",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://evm-qa-dev-test-mydomain-dev-ed.lightning.force.com",
  },
});
