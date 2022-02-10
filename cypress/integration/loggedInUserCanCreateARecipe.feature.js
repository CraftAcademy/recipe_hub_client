/* eslint-disable no-undef */

describe("Logged in user can create a recipe", () => {
  before(() => {
    cy.intercept("GET", "**/api/recipes", { body: { recipes: [] } });
    cy.visitAndAuthenticate();
    cy.get("[data-cy=my-recipes]").click();
    cy.get("[data-cy=create-recipe]").click();

    cy.get("[data-cy=name-input]").type("Pancakes");
    cy.get("[data-cy=instructions]").type("Mix them together. Bake");
  });
  
  describe("ingredients-section", () => {
    
    before(() => {
      cy.get('[data-cy=ingredients-section]').within(()=> {
        cy.get("[data-cy=ingredient-name-input]").type("sugar");
        cy.get("[data-cy=ingredient-amount-input]").type("100");
        cy.get("[data-cy=ingredient-unit-input]").type("grams");

        cy.get('[data-cy=add-new-ingredient-line]').click()
      })
      
    });
    
    it("is expected to add a new line of ingredient fields", () => {
      cy.get('[data-cy=ingredients-section]')
    });
  });
  
  it("is expected to hide create recipe form", () => {
    cy.get("[data-cy=submit-btn]").click();
    cy.get("[data-cy=create-form]").should("not.be.visible");
  });
});
