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
    cy.get("[data-cy=recipe-collection]").children().should("have.length", 3);
  });

  it("is expected to see recipe name", () => {
    cy.get("[data-cy=recipe-name-1]").should("contain", "Souvlaki");
  });

  describe("A logged in user can delete own recipe", () => {
    before(() => {
      cy.intercept("GET", "api/recipes/*", {
        fixture: "recipesShowResponse"
      });
      cy.get("[data-cy=recipe-card-1]").click();
    });

    it("is expeceted to redirect to full recipe view", () => {
      cy.url().should("contain", "/recipes/1144");
    });

    it("is expected to show a delete button if a user is logged in", () => {
      cy.get("[data-cy=delete-btn]").should("be.visible");
    });
  });
});

describe("A visitor can not delete a recipe", () => {
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
  it("is expected to not show a delete button", () => {
    cy.get("[data-cy=delete-btn]").should("not.exist");
  });
});
