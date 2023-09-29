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

    //What I tried before (To use this code, on the "commands.js" file, uncomment lines 63 to 65.)
    //cy.dragAndDrop("@Message", "@Here");

    // With this code, I'm sure that my drag and drop action works. To use it, comment out lines 26 to 34 and uncomment
    // lines 41 to 46, then in the "commands.js" file, uncomment lines 63 to 65. I sent you a screenshot with the result of lines 41 to 46 on our chat
    /*cy.getIframe('[title="Surface"]')
      .wait(5000)
      .get("button[type='button']")
      .contains("Save")
      .as("Save")
      .dragAndDrop("@Message", "@Save");*/
  });
});
