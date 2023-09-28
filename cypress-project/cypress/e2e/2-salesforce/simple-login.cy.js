describe("Salesforce Simple Login", () => {
  beforeEach(() => {
    // Before each Test we will login into Salesforce.
    cy.loginIntoSalesforce();
  });

  /*it("Just login into Salesforce and check if we load any page.", () => {
    cy.get(".title.slds-truncate").first().should("have.text", "Home");
  });*/

  it("Go to Edit Page and put the message on the page", () => {
    const dataTransfer = new DataTransfer();
    cy.visit("/lightning/r/0013t00002WCFleAAH/view")
      .get(".uiMenu")
      .click()
      .wait(5000)
      .get('[role="menu"]')
      .wait(5000)
      .get("#edit-page")
      .click()
      .wait(5000)
      .get(".sectionBody")
      .contains("Evm Advanced Message")
      .as("Message");

    cy.getIframe('[title="Surface"]')
      .wait(5000)
      .find('[title="Activity"]')
      .as("Here")
      .get("@Message")
      .drag("@Here"); // I'm using just the "drag" because I'm' using the "cypress-drag-drop" plugin so, the .drag() command will perform both the drag and drop actions so I just need to specify the destination

    //.get("button[type='button']")
    //.contains("Save")
    //.click()
  });
});
