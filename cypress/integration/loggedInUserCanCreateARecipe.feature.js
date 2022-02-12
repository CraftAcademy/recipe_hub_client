/* eslint-disable no-undef */
describe("Recipe", () => {
  before(() => {
    cy.intercept("GET", "api/recipes", { body: { recipes: [] } });
  });
  describe("can be created by logged in user", () => {
    before(() => {
      cy.intercept("GET", "api/recipes*", {
        fixture: "myRecipesResponse.json"
      });
      cy.intercept("POST", "api/recipes", {
        fixture: "createRecipeResponse.json"
      }).as("create");
      cy.visitAndAuthenticate();
      cy.get("[data-cy=my-recipes]").click();
      cy.get("[data-cy=create-recipe]").click();
      cy.get("[data-cy=name-input]").type("Pancakes");
      cy.get("[data-cy=instructions]").type("Mix them together. Bake");
      cy.get("[data-cy=submit-btn]").click();
    });

    it("is expected to show a success message", () => {
      cy.get("[data-cy=flash-message]").should(
        "contain",
        "Your recipe has been created"
      );
    });
  });
  describe("can't be created with empty name field", () => {
    before(() => {
      cy.intercept("GET", "api/recipes*", {
        fixture: "myRecipesResponse.json"
      });
      cy.intercept("POST", "api/recipes", {
        fixture: "createWithoutName.json"
      });
      cy.intercept("GET", "api/recipes", { body: { recipes: [] } });
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
