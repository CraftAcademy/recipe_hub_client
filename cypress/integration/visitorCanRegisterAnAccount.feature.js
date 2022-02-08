/* eslint-disable no-undef */
describe("User", () => {
  describe("is able register an account", () => {
    before(() => {
      cy.intercept("GET", "/api/recipes", {
        fixture: "recipesIndexResponse.json"
      });
      cy.intercept("POST", "/api/auth", {
        fixture: "registration_successfull_response.json"
      });
      cy.visit("/");
      cy.get("[data-cy=sign-up-btn]").click();
      cy.get("[data-cy=user-name-input]").type("john");
      cy.get("[data-cy=email-input]").type("johnskoglung@test.com");
      cy.get("[data-cy=password-input]").type("password");
      cy.get("[data-cy=conf-password-input]").type("password");
      cy.get("[data-cy=register-button]").click();
    });

    it("is expected to dispaly registration success message", () => {
      cy.get("[data-cy=flash-message]")
        .should("contain.text", "You successfully created an account")
        .and("be.visible");
    });

    it("is expected to be redirected to login page", () => {
      cy.url().should("contain", "/login");
    });
  });

  describe("if password mismatch", () => {
    before(() => {
      cy.intercept("GET", "/api/recipes", {
        fixture: "recipesIndexResponse.json"
      });
      cy.intercept("POST", "api/auth", {
        fixture: "registrationPasswordMissmatch.json",
        statusCode: 401
      });
      cy.visit("/");
      cy.get("[data-cy=sign-up-btn]").click();
      cy.get("[data-cy=user-name-input]").type("john");
      cy.get("[data-cy=email-input]").type("johnskoglung@test.com");
      cy.get("[data-cy=password-input]").type("password");
      cy.get("[data-cy=conf-password-input]").type("wrong");
      cy.get("[data-cy=register-button]").click();
    });

    it("is expected to display an error message", () => {
      cy.get("[data-cy=flash-message]")
        .should("contain.text", "Password confirmation doesn't match Password")
        .and("be.visible");
    });
  });
});
