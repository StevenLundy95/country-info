import React from "react";
import { mount } from "@cypress/react";
import App from "./app";

describe("App component", () => {
  it("renders a form with a text input", () => {
    mount(<App />);
    cy.get('form').should('exist');
    cy.get('input[type="text"]').should('exist');
  });
});
