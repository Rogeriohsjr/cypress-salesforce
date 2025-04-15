#!/bin/bash
# run-cypress.sh - A helper script to run Cypress with a specific Salesforce instance URL

# Check if URL is provided
if [ -z "$1" ]; then
  echo "Usage: ./run-cypress.sh <salesforce-instance-url> [cypress-args]"
  echo "Example: ./run-cypress.sh https://my-dev-instance.salesforce.com open"
  exit 1
fi

# Set the base URL
export CYPRESS_BASE_URL="$1"
shift

# Run Cypress with remaining arguments
npx cypress "$@" 