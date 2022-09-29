const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    sf_loginType: "SessionId",//SOAP or SessionId
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
