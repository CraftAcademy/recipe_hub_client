/* eslint-disable no-undef */
describe("Loged in user", () => {
  before(() => {
    cy.intercept("GET", "api/recipes*", {
      fixture: "myRecipesResponse.json"
    });
    cy.visitAndAuthenticate();
    cy.get("[data-cy=my-recipes]").click();
  });

  describe("can delete own recipe", () => {
    before(() => {
      cy.intercept("GET", "api/recipes/*", {
        fixture: "recipesShowResponse"
      });
      cy.intercept("DELETE", "api/recipes/*", {
        fixture: "deleteResponse"
      }).as("RecipeDelete");
      cy.get("[data-cy=recipe-card-1]").click();
    });

    it("is expeceted to redirect to full recipe view", () => {
      cy.url().should("contain", "/recipes/1144");
    });

    it("is expected to show a delete button if a user is logged in", () => {
      cy.get("[data-cy=delete-btn]").should("be.visible");
    });

    describe("by pressing the delete button", () => {
      before(() => {
        cy.intercept("DELETE", "api/recipes/*", {
          fixture: "deleteResponse"
        }).as("RecipeDelete");
        cy.get("[data-cy=delete-btn]").click();
      });

      it("is expected to make a DELETE request to the API", () => {
        cy.wait("@RecipeDelete").its("request.method").should("eq", "DELETE");
      });

      it("is expected to trigger a confirmation with a message", () => {
        cy.on("window:confirm", (text) => {
          expect(text).to.contains(
            "Are you sure you want to delete this recipe?"
          );
        });
      });

      it("it is expected to respond with a message", () => {
        cy.get("[data-cy=flash-message]").should(
          "contain",
          "Your Recipe has been deleted!"
        );
      });

      describe("redirect after deletion of a recipe", () => {
        before(() => {
          cy.intercept("GET", "api/recipes**", {
            fixture: "myRecipesResponse.json"
          });
        });

        it("is expected to redirect to My Recipes view", () => {
          cy.url().should("contain", "/my-recipes");
        });
      });
    });
  });

  describe("Logged in user can not delete other users recipes", () => {
    before(() => {
      cy.intercept("GET", "api/recipes**", {
        fixture: "recipeDifferentOwner.json"
      });
    });
    it("is expected to not show a delete button for other users recipes", () => {
      cy.get("[data-cy=delete-btn]").should("not.exist");
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
