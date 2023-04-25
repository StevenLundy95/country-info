import React from "react";
import { mount } from "@cypress/react";
import Countryinfo from "././countryinfo";

describe("Countryinfo component", () => {
    it("displays the country information correctly", () => {
        const countryName = "Canada";
        mount(<Countryinfo countryName={countryName} />);

        cy.contains("Loading...").should("exist"); // Check if loading spinner is displayed

        cy.contains("Canada"); // Check if country name is displayed

        cy.get(".info-list").within(() => {
            cy.contains("Capital: Ottawa"); // Check if capital is displayed
            cy.contains("Region: Americas"); // Check if region is displayed
            cy.contains("Subregion: North America"); // Check if subregion is displayed
            cy.contains("Area: 9984670 km²"); // Check if area is displayed
            cy.contains("Languages: English, French"); // Check if languages are displayed
            cy.contains("Currencies: Canadian dollar"); // Check if currencies are displayed
            cy.contains("Country Code: CA"); // Check if country code is displayed
            cy.contains("Top-level Domains: .ca"); // Check if top-level domains are displayed
        });

        cy.contains("Loading...").should("not.exist"); // Check if loading spinner is hidden
    });
});
