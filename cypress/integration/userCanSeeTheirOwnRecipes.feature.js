/* eslint-disable no-undef */
describe("User can see their personal page", () => {
  before(() => {
    cy.intercept("GET", "api/recipes*", {
      fixture: "myRecipesResponse.json"
    }).as("MyRecipes");
    cy.visitAndAuthenticate();
    cy.get("[data-cy=my-recipes]").click();
  });

  it("is expected to make a GET request to the API filtered by the users recipes", () => {
    cy.wait("@MyRecipes").its("request.method").should("eq", "GET");
  });

  it("is expected to see collection of recipes", () => {
    cy.get("[data-cy=current-user-recipes]").should("have.length", 3);
  });

  it("is expected to see recipe title", () => {
    cy.get("[data-cy=current-user-recipes]")
      .children()
      .first()
      .within(() => {
        cy.get("[data-cy=recipe-title]").should("contain", "Souvlaki");
      });
  });

  describe("user can click on recipe to update it", () => {
    before(() => {
      cy.intercept("GET", "api/recipes/*", {
        fixture: "recipesShowResponse"
      });
      cy.get("[data-cy=current-user-recipes]").first().click();
    });

    it("is expeceted to redirect to full recipe view", () => {
      cy.url().should("contain", "/recipes/1141");
    });
  });
});
