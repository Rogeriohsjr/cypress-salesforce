# cypress-salesforce

This is a simple project to make Cypress to work with Salesforce.

To run this project follow the steps below:

### Preparing your Salesforce

1. Create a Salesforce Org.
  - 1.1. SF Site to create the org: https://developer.salesforce.com/signup
2. Login into your Org.
3. Resetting Security Token
- 3.1. On the Right Top corner you have an icon, click there and click on Settings, which is beside of Logout.
- 3.2. In the left bar menu, click on Reset My Security Token.
- 3.3. Click on Reset Security Token button.
- 3.4. You should get a Security Token in your email.
4. Now you should have these information in hand:
- 4.1. Your Username
- 4.2. Your Password
- 4.3. Your Security Token
- 4.5. Your Lightning Domain(get that from the URL after you login into SF)
- 4.5.1. Ex: https://x-ed.develop.lightning.force.com/

### Setting Up the Cypress Project - SOAP

1. For this example we will use the SOAP mechanism.
2. Open the cypress-project folder from this repo into VSCode
3. Open cypress.config.js and fill the fields
- 3.1. sf_loginType: "SOAP"
- 3.2. sf_username: should be the username that you have in 5.1. step from Preparing your Salesforce Section.
- 3.3. sf_password: It should be your password and Security Token(Password + Security Token).
- 3.3.1. Example: Password is 123 and Security Token is 1ABB23F, so the sf_password should be: 1231ABB23F
- 3.4. sf_instanceUrl: change to test.salesforce.com only if you are using Sandboxes or Scratch Org, if you did the step above, you should use login.salesforce.com. Developer Org uses login.salesforce.
- 3.5. baseUrl: add your lightning page, 5.5. step from Preparing your Salesforce Section.
4. Done, you should be good to start the project.

### Starting Cypress Project

1. run:
1.1. npm install
1.2. npx cypress open
2. Click on E2E project
3. Select the browser
4. Then it will show the tests
5. Click on simple-login
6. That is it!
