Cypress.Commands.add("loginIntoSalesforce", () => {
  const sfLoginType = Cypress.env("sf_loginType");
  if (sfLoginType == "SOAP") {
    cy.log("Login into Salesforce using SOAP.");
    cy.salesforceLoginSOAP();
  } else if (sfLoginType == "SessionId") {
    cy.log("Login into Salesforce using Session Id.");
    cy.salesforceLoginManualSessionId();
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
  // Todo.
});

Cypress.Commands.add("getIframe", (iframeSelector) => {
  return cy
    .get(iframeSelector, { timeout: 10000 })
    .should(($iframe) => {
      expect($iframe.contents().find("body")).to.exist;
    })

    .then(($iframe) => $iframe.contents().find("body"));
});

//What I tried before
/*Cypress.Commands.add("dragAndDrop", (source, target) => {
  cy.get(source).trigger("mousedown", { which: 1 });
  cy.get(target).trigger("mousemove").trigger("mouseup", { force: true });
});*/
