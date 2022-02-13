/* eslint-disable no-undef */
describe("Foo Bar", () => {
  before(() => {
    cy.intercept("GET", "api/recipes*", {
      fixture: "myRecipesResponse.json"
    });
    cy.visitAndAuthenticate();
    cy.get("[data-cy=my-recipes]").click();
    cy.intercept("GET", "api/recipes/*", {
      fixture: "recipesShowResponse"
    });
    cy.get("[data-cy=recipe-card-1]").click();
  });

  it('is expected to display "Edit" button', () => {
    cy.get("[data-cy=edit-recipe-btn]").should("contain.text", "Edit");
  });

  describe('By clicking "Edit" button', () => {
    before(() => {
      cy.get("[data-cy=edit-recipe-btn]").click();
    });

    it("is expected to navigate to edit recipe view", () => {
      cy.url().should("contain", "/recipes/12/edit");
    });

    it("is expected to display recipe name input field pre-filled", () => {
      cy.get("[data-cy=recipe-name]").should(
        "contain.text",
        "Fried rice with kimchi"
      );
    });

    it("is expected to display recipe instructions input field pre-filled", () => {
      cy.get("[data-cy=instructions]").should(
        "contain.text",
        "1. On medium high heat preheat a pan/wok and once heated, add the cooking oil and spread it well with a spatula."
      );
    });
  });
});
