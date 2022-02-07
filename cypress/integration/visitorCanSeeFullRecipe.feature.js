describe("A visitor, by clicking a recipe card in the main view", () => {
  before(() => {
    cy.intercept("GET", "/api/recipes", {
        fixture: "recipesIndexResponse.json"
      }).as("RecipesIndex");
    cy.intercept("GET", "/api/recipes/**", {
        fixture: "recipesShowResponse.json"
      }).as("RecipeShow");
    cy.visit("/");
    cy.wait("@RecipesIndex");
    cy.get("[data-cy=recipe-card-1]").click();
  });

  it("is expected to make a GET request to the API", () => {
    cy.wait("@RecipeShow").its("request.method").should("eq", "GET");
  });

  it("is expected to display recipe id in the url", () => {
    cy.url().should("contain", "/recipes/12");
  });

  it("is expected to display recipe title", () => {
    cy.get("[data-cy=recipe-title]")
      .should("contain.text", "Fried rice with kimchi");
  });
});
