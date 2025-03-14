describe("Salesforce Simple Login", () => {
  beforeEach(() => {
    // Before each Test we will login into Salesforce.
    cy.loginIntoSalesforce();
    /**
     * Ideally we would go to an Account List Page, then click on an existing record, then click on Edit.
     */
    //cy.visit("/lightning/o/Account/list");

    /**
     * This is a short cut to the builder, which generates the same error if we do the long process above.
     */
    cy.visit("/visualEditor/appBuilder.app");
  });

  it("Just login into Salesforce and check if we load any page.", () => {
    // Some code here
  });
});
