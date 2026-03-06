import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // On va tout faire dans App.js pour simplifier

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
