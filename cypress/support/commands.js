Cypress.Commands.add("loginIntoSalesforce", () => {
  const sfLoginType = Cypress.env("sf_loginType");
  if (sfLoginType == "SOAP") {
    cy.log("Login into Salesforce using SOAP.");
    cy.salesforceLoginSOAP();
  } else if (sfLoginType == "SessionId") {
    cy.log("Login into Salesforce using Session Id.");
    cy.salesforceLoginManualSessionId();
  } else if (sfLoginType == "OAuth") {
    cy.log("Login into Salesforce using OAuth 2.0 Username-Password flow.");
    cy.salesforceLoginOAuth();
  } else if (sfLoginType == "SFDX") {
    cy.log("Login into Salesforce using SFDX CLI.");
    cy.salesforceLoginSFDXScratchOrgs();
  } else {
    cy.log("Login Type not Found! Might be localhost?");
  }
});

Cypress.Commands.add("salesforceLoginSOAP", () => {
  cy.readFile("salesforceSoapTestUser.xml").then((requestBody) => {
    const sfUsername = Cypress.env("sf_username");
    const sfPassword = Cypress.env("sf_password");
    const sfInstanceURL = Cypress.env("sf_instanceUrl");
    const sfCustomDomainURL = Cypress.config("baseUrl");

    cy.request({
      method: "POST",
      url: sfInstanceURL + "/services/Soap/u/55.0",
      headers: {
        SOAPAction: "abc",
        ["Content-Type"]: "text/xml",
      },
      body: requestBody
        .replace("[[username]]", sfUsername)
        .replace("[[passwordAndSecurityToken]]", sfPassword),
    }).then((response) => {
      const sessionID = Cypress.$(response.body).find("sessionId").text();
      cy.log("Test Session", sessionID);
      cy.visit(sfCustomDomainURL + "/secur/frontdoor.jsp?sid=" + sessionID);
    });
  });
});

Cypress.Commands.add("salesforceLoginManualSessionId", () => {
  cy.readFile("salesforceSoapTestUser.xml").then((requestBody) => {
    const sfSessionId = Cypress.env("sf_sessionId");
    const sfCustomDomainURL = Cypress.config("baseUrl");

    cy.visit(sfCustomDomainURL + "/secur/frontdoor.jsp?sid=" + sfSessionId);
  });
});

Cypress.Commands.add("salesforceLoginSFDXScratchOrgs", () => {
  // Read the token file that was generated before running Cypress
  cy.readFile("sf-token.json").then((tokenData) => {
    const accessToken = tokenData.accessToken;
    const instanceUrl = tokenData.instanceUrl;

    cy.log(`Successfully retrieved access token from file`);
    cy.log(`Instance URL: ${instanceUrl}`);

    // Use the access token to authenticate via frontdoor.jsp
    cy.visit(instanceUrl + "/secur/frontdoor.jsp?sid=" + accessToken);
  });
});
