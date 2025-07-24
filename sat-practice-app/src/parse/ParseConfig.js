// src/parse/ParseConfig.js
import Parse from "parse";
import environments from "../environments";

// Initializes Parse with your Back4App credentials
// This allows interaction with the Parse server for user management, data storage, etc.

Parse.initialize(
  environments.PARSE_APPLICATION_ID,
  environments.PARSE_JAVASCRIPT_KEY
);

Parse.serverURL = environments.PARSE_SERVER_URL;

console.log("✅ Parse Initialized:", environments.PARSE_APPLICATION_ID);

export default Parse;

