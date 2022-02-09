/* eslint-disable no-undef */
describe("User can log in", () => {
  before(() => {
    cy.intercept("GET", "/api/recipes", {
      fixture: "recipesIndexResponse"
    });

    cy.visit("/");
    cy.get("[data-cy=login-btn]").click();
  });

  it("is expected that email input field is visible", () => {
    cy.get("[data-cy=email-input]").should("be.visible");
  });

  it("is expected that password input field is visible", () => {
    cy.get("[data-cy=password-input]").should("be.visible");
  });

  describe("can fill in email and password input fields", () => {
    before(() => {
      cy.intercept("POST", "/api/auth/sign_in", {
        fixture: "authenticatedUserResponse"
      });
      cy.intercept("GET", "/api/auth/validate_token", {
        fixture: "authenticatedUserResponse",
        headers: { uid: "johnskoglund@test.com", token: "12344556789" }
      });
      cy.get("[data-cy=email-input]").type("johnskoglund@test.com");
      cy.get("[data-cy=password-input]").type("password{enter}");
    });

    it("is expected to dispay user name in a welocome message", () => {
      cy.get("[data-cy=user-name]").should("contain", "John Skoglund");
    });
  });
});
