describe("Salesforce Simple Login", () => {
  beforeEach(() => {
    // Before each Test we will login into Salesforce.
    cy.loginIntoSalesforce();
  });

  it("Just login into Salesforce and check if we load any page.", () => {
    cy.get(".title.slds-truncate").first().should('have.text', 'Home');
  });
});
