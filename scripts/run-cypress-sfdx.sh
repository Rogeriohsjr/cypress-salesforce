#!/bin/bash
# run-cypress-sfdx.sh - A helper script to run Cypress with SFDX configuration

# Extract the instanceUrl from sf-token.json
INSTANCE_URL=$(node -e "try { const fs = require('fs'); const path = require('path'); const filePath = path.resolve(process.cwd(), 'sf-token.json'); if (fs.existsSync(filePath)) { const data = JSON.parse(fs.readFileSync(filePath, 'utf8')); console.log(data.instanceUrl); } else { throw new Error('sf-token.json not found'); } } catch(e) { console.error(e.message); process.exit(1); }")

if [ $? -ne 0 ]; then
  echo "Failed to extract instanceUrl from sf-token.json"
  echo "Trying to get URL from SFDX CLI..."
  
  # Try to get URL from SFDX CLI
  INSTANCE_URL=$(sf org display --json | node -e "try { const data = JSON.parse(process.stdin.read()); if (data && data.result && data.result.instanceUrl) { console.log(data.result.instanceUrl); } else { throw new Error('No instanceUrl found in SFDX output'); } } catch(e) { console.error(e.message); process.exit(1); }")
  
  if [ $? -ne 0 ]; then
    echo "Failed to get instanceUrl from SFDX CLI"
    echo "Please set CYPRESS_BASE_URL manually or ensure you're authenticated with SFDX"
    exit 1
  fi
fi

echo "Using Salesforce instance URL: $INSTANCE_URL"

# Set the base URL environment variable
export CYPRESS_BASE_URL="$INSTANCE_URL"

# Run Cypress with the provided arguments
npx cypress "$@" 