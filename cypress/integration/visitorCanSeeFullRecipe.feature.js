/* eslint-disable no-undef */
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

  it("is expected to display recipe name", () => {
    cy.get("[data-cy=recipe-name]").should(
      "contain.text",
      "Fried rice with kimchi"
    );
  });

  it("is expected to display recipe instructions", () => {
    cy.get("[data-cy=recipe-instructions]").should(
      "contain.text",
      "1. On medium high heat preheat a pan/wok and once heated, add the cooking oil and spread it well with a spatula."
    );
  });

  it("is expected to display recipe ingredients", () => {
    cy.get("[data-cy=ingredients-list]").within(() => {
      cy.get("[data-cy=ingredient-name-1]").should("contain.text", "sugar");
      cy.get("[data-cy=ingredient-quantity-1]").should(
        "contain.text",
        "100 grams"
      );
    });
  });

  it("is expected to display recipe creation date", () => {
    cy.get("[data-cy=recipe-created_at]").should(
      "contain.text",
      "February 07, 2022 16:38"
    );
  });
  it("is expected to display a add comment field", () => {
    cy.get("[data-cy=comment-field]").should("be.visible");
  });

  it("is expected to display a comment feed", () => {
    cy.get("[data-cy=comment-feed]").should("be.visible");
  });

  describe("goes back to main page", () => {
    before(() => {
      cy.intercept("GET", "/api/recipes", {
        fixture: "recipesIndexResponse.json"
      });
      cy.get("[data-cy=title]").click();
    });

    it("is expected to change the url ", () => {
      cy.url().should("not.contain", "/recipes/12");
    });

    it("is expected to see a collection of recipes", () => {
      cy.get("[data-cy=recipes-list]").children().should("have.length", 7);
    });
  });
});

describe("post a comment when hitting the enter button", () => {
  before(() => {
    cy.intercept("GET", "/api/recipes/**", {
      fixture: "recipesShowResponse.json"
    }).as("RecipeShow");
    cy.visit("/recipes/12");

    cy.intercept("POST", "/api/recipes/**/comments", {
      fixture: "createCommentResponse"
    });
    cy.get("[data-cy=comment-field]")
      .type("I really enjoyed this recipe!")
      .type("{enter}");
  });

  it("is expected to display a comment in the comment feed", () => {
    cy.get("[data-cy=comment-feed").should(
      "contain.text",
      "I really enjoyed this recipe!"
    );
  });
});
