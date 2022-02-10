/* eslint-disable no-undef */
describe("User can log in", () => {
  before(() => {
    cy.visit("/");
    cy.get("[data-cy=login-btn]").click();
  });

  it("is expected that email input field is visible", () => {
    cy.get("[data-cy=email-input]").should("be.visible");
  });

  it("is expected that password input field is visible", () => {
    cy.get("[data-cy=password-input]").should("be.visible");
  });

  describe.only("can fill in email and password input fields", () => {
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

    describe("Can create a recipe", () => {
      before(() => {
        cy.get("[data-cy=my-recipes]").click();
        cy.get("[data-cy=create-recipe]").click();
        cy.get("[data-cy=name-input]").type("Pancakes");
        cy.get("[data-cy=ingredient-name-input-1]").type("sugar");
        cy.get("[data-cy=ingredient-amount-input-1]").type("100");
        cy.get("[data-cy=ingredient-unit-input-1]").type("grams");
        cy.get("[data-cy=add-ingredient-btn]").click();
        cy.get("[data-cy=ingredient-name-input-2]").type("milk");
        cy.get("[data-cy=ingredient-amount-input-2]").type("2");
        cy.get("[data-cy=ingredient-unit-input-2]").type("dl");
        cy.get("[data-cy=instructions]").type("Mix them together. Bake");
        cy.get("[data-cy=submit-btn]").click();
      });

      it("is expected to hide create recipe form", () => {
        cy.get("[data-cy=create-form]").should("not.be.visible");
      });
    });
  });

  describe("can fill wrong credentials", () => {
    before(() => {
      cy.intercept("POST", "/api/auth/sign_in", {
        body: {
          success: false,
          errors: ["Invalid login credentials. Please try again."]
        },
        statusCode: 401
      }).as("authenticateRequest");
      cy.visit("/");
      cy.get("[data-cy=login-btn]").click();
      cy.get("[data-cy=email-input]").type("johnskoglund@test.com");
      cy.get("[data-cy=password-input]").type("wrongpassword{enter}");
    });

    it("is expected to display an error message", () => {
      cy.get("[data-cy=flash-message]").should(
        "contain.text",
        "Invalid login credentials. Please try again."
      );
    });
  });
});
