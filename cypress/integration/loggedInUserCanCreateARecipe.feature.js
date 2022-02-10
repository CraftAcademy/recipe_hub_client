/* eslint-disable no-undef */
describe("Recipe", () => {
  before(() => {
    cy.intercept("GET", "**api/recipes**", { body: { recipes: [] } });
  });
  describe("can be created by logged in user", () => {
    before(() => {
      cy.visitAndAuthenticate();
      cy.get("[data-cy=my-recipes]").click();
      cy.get("[data-cy=create-recipe]").click();
      cy.get("[data-cy=name-input]").type("Pancakes");
      cy.get("[data-cy=instructions]").type("Mix them together. Bake");
    });

    describe("ingredients-section", () => {
      before(() => {
        cy.intercept("POST", "**api/recipes**", {
          fixture: "createRecipeResponse.json"
        }).as("create");
        cy.get("[data-cy=ingredients-section]").within(() => {
          cy.get("[data-cy=ingredient-name-input]").type("sugar");
          cy.get("[data-cy=ingredient-amount-input]").type("100");
          cy.get("[data-cy=ingredient-unit-input]").type("grams");
          cy.get("[data-cy=add-new-ingredient-line]").click();
        });
      });

      it("is expected to hide create recipe form", () => {
        cy.get("[data-cy=submit-btn]").click();
        cy.wait("@create");
      });

      it("is expected to show a success message", () => {
        cy.get("[data-cy=flash-message]").should(
          "contain",
          "Your recipe has been created"
        );
      });
      // it("is expected to add a new line of ingredient fields", () => {
      //   cy.get("[data-cy=ingredients-section]");
      // });
      // cy.get("[data-cy=create-form]").should("not.be.visible");
    });
  });
  describe("can't be created with empty name field", () => {
    before(() => {
      cy.intercept("POST", "**api/recipes**", {
        fixture: "createWithoutName.json"
      });
      cy.intercept("GET", "**api/recipes**", { body: { recipes: [] } });
      cy.visitAndAuthenticate();
      cy.get("[data-cy=my-recipes]").click();
      cy.get("[data-cy=create-recipe]").click();
      cy.get("[data-cy=instructions]").type("Mix them together. Bake");
      cy.get("[data-cy=submit-btn]").click();
    });

    it("is expected to see error message", () => {
      cy.get("[data-cy=flash-message]").should(
        "contain",
        "Name can't be blank"
      );
    });
  });
});
