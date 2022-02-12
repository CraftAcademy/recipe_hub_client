/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload'
Cypress.Commands.add('visitAndAuthenticate', () => {
  cy.intercept("POST", "/api/auth/sign_in", {
    fixture: "authenticatedUserResponse"
  });
  cy.intercept("GET", "/api/auth/validate_token", {
    fixture: "authenticatedUserResponse",
    headers: { uid: "johnskoglund@test.com", token: "12344556789" }
  });
  cy.visit("/");
  cy.get("[data-cy=login-btn]").click();
  cy.get("[data-cy=email-input]").type("johnskoglund@test.com");
  cy.get("[data-cy=password-input]").type("password{enter}");
})