/* eslint-disable no-undef */
describe("Visitor can visit the home page.", () => {
  before(() => {
    cy.intercept("GET", "/api/recipes", {
      fixture: "recipesIndexResponse.json"
    }).as("RecipesIndex");
    cy.visit("/");
    cy.wait("@RecipesIndex");
  });
  
  describe('Can see a navbar', () => {
    it('is expected to see a header', () => {
      cy.get("[data-cy=title]").should("contain.text", "Recipe Hub")
    });
  });

  it("is expected to see a collection of recipes", () => {
    cy.get("[data-cy=recipes-list]").children().should("have.length", 7);
  });

  it("is expected to see creation date for recipe", () => {
    cy.get("[data-cy=recipe-header-1]").should(
      "contain.text",
      "February 07, 2022 16:38"
    );
  });

  it("is expected to see name of first recipe ", () => {
    cy.get("[data-cy=recipe-header-1]").should(
      "contain.text",
      "Fried rice with kimchi"
    );
  });

  it("is expected to see description of first recipe ", () => {
    cy.get("[data-cy=recipe-expand-1]").click()
    cy.get("[data-cy=recipe-description-1]").should(
      "contain.text",
      "Mix everything"
    );
  });
});
