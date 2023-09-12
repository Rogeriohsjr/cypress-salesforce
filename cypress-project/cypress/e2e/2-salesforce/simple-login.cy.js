describe("Salesforce Simple Login", () => {
  beforeEach(() => {
    // Before each Test we will login into Salesforce.
    cy.loginIntoSalesforce();
  });

  it("Just login into Salesforce and check if we load any page.", () => {
    cy.get(".title.slds-truncate").first().should("have.text", "Home");
  });

  it("Go to Edit Page", () => {
    cy.visit("/lightning/r/0013t00002WCFleAAH/view")
      .get(".uiMenu")
      .click()
      .wait(5000)
      .get('[role="menu"]')
      .wait(5000)
      .get("#edit-page")
      .click()
      .wait(5000);
  });
});
