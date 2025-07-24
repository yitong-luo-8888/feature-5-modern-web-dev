// src/index.js

// Entry point of the React app
// Renders <App /> into the root DOM node defined in public/index.html
// Also loads global styles and initializes Parse backend service
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./parse/ParseConfig";

console.log("✅ index.js loaded");  // ✅ DEBUG LINE

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
