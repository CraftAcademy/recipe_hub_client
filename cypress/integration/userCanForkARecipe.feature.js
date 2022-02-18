describe('A user can click on "Fork" button on a Recipe in the main view', () => {
  before(() => {
    cy.intercept("GET", "/api/recipes**", {
      fixture: "forkedRecipeMyRecipeResponse"
    });
    cy.intercept("GET", "/api/recipes", {
        fixture: "recipesIndexResponse"
      }).as("RecipesIndex");
    cy.intercept("POST", "/api/recipes", {
        fixture: "forkRecipeResponse"
      }).as("RecipesFork");
    cy.visitAndAuthenticate();
    cy.wait("@RecipesIndex");
    cy.get("[data-cy=recipe-fork-btn-1]").click();
  });

  it("is expected to make a POST request", () => {
    cy.wait("@RecipesFork").its("request.method").should("eq", "POST");
  });

  it('is expected to redirect the user to "My Recipes" view', () => {
    cy.url().should("contain", "/my-recipes");
  });

  it('is expected to display forked recipe in "My Recipes" view', () => {
    cy.get("[data-cy=recipe-card-1]").within(() => {
      cy.get("[data-cy=recipe-name-1]")
        .should("contain.text", "Fried rice with kimchi");
    });
  });

  it("is expected to display flash message", () => {
    cy.get("[data-cy=flash-message]")
      .should(
        "contain.text",
        "The recipe was successfully forked and saved in your collection"
      );
  });
});
