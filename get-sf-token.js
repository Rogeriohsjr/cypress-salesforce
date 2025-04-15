#!/usr/bin/env node

/**
 * This script gets a Salesforce access token using the SF CLI
 * and outputs it in a format that can be easily consumed by Cypress.
 */

const { execSync } = require("child_process");
const fs = require("fs");

// Get the target username from command line arguments
const targetUsername = process.argv[2];

if (!targetUsername) {
  console.error("Error: Target username is required");
  console.error("Usage: node get-sf-token.js <target-username>");
  process.exit(1);
}

try {
  // Execute the SF CLI command
  const command = `sf org display --target-org ${targetUsername} --json`;
  const output = execSync(command, { encoding: "utf8" });

  // Parse the JSON output
  const orgInfo = JSON.parse(output);

  if (!orgInfo.result || !orgInfo.result.accessToken) {
    console.error("Error: Failed to retrieve access token");
    process.exit(1);
  }

  // Create a simple output object with just the access token
  const result = {
    accessToken: orgInfo.result.accessToken,
    instanceUrl: orgInfo.result.instanceUrl,
  };

  // Write to a file that Cypress can read
  fs.writeFileSync("sf-token.json", JSON.stringify(result));

  console.log("Access token successfully retrieved and saved to sf-token.json");
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
