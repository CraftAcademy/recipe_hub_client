/* eslint-disable no-undef */
describe("Visitor can visit the home page.", () => {
  before(() => {
    cy.intercept("GET", "**/api/recipes", {
        fixture: "recipeIndexResponse.json"
      }).as("Recipes.index");
    cy.visit("/");
  });

  it('is expected to see "Recipe Hub"', () => {
    cy.get("[data-cy=title]").should("contain.text", "Recipe Hub");
  });

  it("is expected to see a collection of recipes", () => {
    cy.get("[data-cy=recipes-list]").children().should("have.length", 7);
  });

  
});
