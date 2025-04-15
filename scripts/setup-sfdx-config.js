const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

try {
  // Option 1: Read from existing token file
  if (fs.existsSync("sf-token.json")) {
    console.log("Reading from sf-token.json file...");
    const tokenData = JSON.parse(fs.readFileSync("sf-token.json", "utf8"));
    updateConfig(tokenData.instanceUrl);
  }
  // Option 2: Get from SFDX directly
  else {
    console.log("Getting org information from SFDX...");
    try {
      const orgInfo = JSON.parse(execSync("sf org display --json").toString());
      if (orgInfo.result && orgInfo.result.instanceUrl) {
        updateConfig(orgInfo.result.instanceUrl);
      } else {
        throw new Error("Could not retrieve instance URL from SFDX");
      }
    } catch (error) {
      console.error("Error executing SFDX command:", error.message);
      console.error(
        "Make sure you have SFDX CLI installed and you are authenticated."
      );
      process.exit(1);
    }
  }
} catch (error) {
  console.error("Error setting up SFDX configuration:", error.message);
  process.exit(1);
}

function updateConfig(instanceUrl) {
  if (!instanceUrl) {
    throw new Error("Instance URL is required");
  }

  // Validate URL format
  if (
    !instanceUrl.startsWith("http://") &&
    !instanceUrl.startsWith("https://")
  ) {
    throw new Error(
      `Invalid instance URL: ${instanceUrl}. Must start with http:// or https://`
    );
  }

  console.log(`Setting baseUrl to: ${instanceUrl}`);

  // Set environment variable for the current process
  process.env.CYPRESS_BASE_URL = instanceUrl;

  // Also update the config file for persistence
  const configPath = path.join(__dirname, "..", "cypress.config.js");
  let configContent = fs.readFileSync(configPath, "utf8");

  // Create updated config content - replace the baseUrl line
  const updatedConfig = configContent.replace(
    /baseUrl: .*,/,
    `baseUrl: "${instanceUrl}",`
  );

  // Write the updated config back
  fs.writeFileSync(configPath, updatedConfig);
  console.log("Successfully updated Cypress configuration");
}
