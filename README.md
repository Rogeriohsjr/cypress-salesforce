# Cypress Salesforce Testing

This project contains Cypress tests for Salesforce applications.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create an sf-token.json file with your Salesforce credentials:

```json
{
  "accessToken": "your-salesforce-access-token",
  "instanceUrl": "https://your-salesforce-instance.salesforce.com"
}
```

You can generate this file using the Salesforce CLI or manually create it with your credentials.

## Running Tests

There are several ways to run the Cypress tests:

### Option 1: Using SFDX (Recommended)

This option automatically retrieves the Salesforce instance URL from sf-token.json or SFDX:

```bash
# Open Cypress UI
npm run cypress:open:sfdx

# Run tests headlessly
npm run cypress:run:sfdx

# Run a specific test
npm run cypress:run:sfdx -- --spec "cypress/e2e/2-salesforce/simple-login.cy.js"
```

### Option 2: Using Environment Variables

You can set the Salesforce instance URL and other parameters using environment variables:

```bash
# Set the required environment variables
export CYPRESS_BASE_URL=https://your-salesforce-instance.salesforce.com
export CYPRESS_SF_LOGIN_TYPE=SFDX  # SOAP, SessionId, OAuth, or SFDX

# Open Cypress UI
npm run cypress:open:env

# Run tests headlessly
npm run cypress:run:env
```

### Option 3: Using the Convenience Script

A convenience script is provided to quickly run tests with a specific Salesforce instance:

```bash
# Open Cypress UI
./scripts/run-cypress.sh https://your-salesforce-instance.salesforce.com open

# Run tests headlessly
./scripts/run-cypress.sh https://your-salesforce-instance.salesforce.com run
```

## Configuration

The Cypress configuration is in `cypress.config.js`. The following environment variables can be set:

- `CYPRESS_BASE_URL`: The Salesforce instance URL (required)
- `CYPRESS_SF_LOGIN_TYPE`: The login method to use (SOAP, SessionId, OAuth, or SFDX)
- `CYPRESS_SF_USERNAME`: Salesforce username (for SOAP and OAuth login)
- `CYPRESS_SF_PASSWORD`: Salesforce password (for SOAP and OAuth login)
- `CYPRESS_SF_INSTANCE_URL`: Salesforce instance URL (for SOAP login)
- `CYPRESS_SF_SESSION_ID`: Salesforce session ID (for SessionId login)

## Login Methods

The project supports multiple login methods:

1. **SFDX**: Uses the SFDX CLI to authenticate (default)
2. **SOAP**: Uses SOAP API to authenticate
3. **SessionId**: Uses a provided session ID to authenticate
4. **OAuth**: Uses OAuth 2.0 Username-Password flow to authenticate

## Troubleshooting

### Configuration Error

If you encounter the "Cypress configuration error" with a message about `e2e.baseUrl` being invalid, make sure you've set the `CYPRESS_BASE_URL` environment variable or are using one of the scripts that sets it automatically.

### Test Failures

If your tests are failing with an error like "Expected to find element: `.title.slds-truncate`, but never found it", it could be due to:

1. Authentication issues - Check that your access token is valid
2. Page structure changes - The Salesforce UI may have changed
3. Timing issues - You may need to add wait or retry logic

Check the screenshots in the `cypress/screenshots` directory for visual evidence of what's happening during the test.
