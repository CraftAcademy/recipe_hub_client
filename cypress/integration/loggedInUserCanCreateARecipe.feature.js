/* eslint-disable no-undef */
describe("Recipe", () => {
  before(() => {
    cy.intercept("GET", "api/recipes", { body: { recipes: [] } });
    cy.intercept("GET", "api/ingredients", {
      fixture: "ingredientsIndexResponse.json"
    });
  });
  describe("can be created by logged in user", () => {
    before(() => {
      cy.intercept("GET", "api/recipes*", {
        fixture: "myRecipesResponse.json"
      });
      cy.intercept("POST", "api/recipes", {
        fixture: "createRecipeResponse.json"
      }).as("create");
      cy.visitAndAuthenticate();
      cy.get("[data-cy=my-recipes]").click();
      cy.get("[data-cy=create-recipe]").click();
      cy.get("[data-cy=recipe-name]").type("Pancakes");
      cy.get("[data-cy=instructions]").type("Mix them together. Bake");
      cy.get("[data-cy=attach-image]").attachFile("./carbonara.jpeg")
      cy.get("[data-cy=submit-btn]").click();
      cy.get("[data-cy=ingredient-name-0]").click();
      cy.get("[data-cy=ingredient-option-1]").click();
      cy.get("[data-cy=unit-input-0]").type("grams");
      cy.get("[data-cy=amount-input-0]").type("100");
      cy.get("[data-cy=add-ingredient-line]").click();
    });

    it("is expected to display a new ingredient name select field", () => {
      cy.get("[data-cy=ingredient-name-1]").should("be.visible");
    });

    it("is expected to display a new ingredient unit input field", () => {
      cy.get("[data-cy=unit-input-1]").should("be.visible");
    });

    it("is expected to display a new ingredient amount input field", () => {
      cy.get("[data-cy=amount-input-1]").should("be.visible");
    });

    describe("can delete a line of ingredient input fields", () => {
      before(() => {
        cy.get("[data-cy=remove-btn-1]").click();
      });

      it("is expected to hide second ingredient name select field", () => {
        cy.get("[data-cy=ingredient-name-1]").should("not.exist");
      });

      it("is expected to hide second ingredient unit input field", () => {
        cy.get("[data-cy=unit-input-1]").should("not.exist");
      });

      it("is expected to hide second ingredient amount input field", () => {
        cy.get("[data-cy=amount-input-1]").should("not.exist");
      });
    });
    describe("can see success message when recipe is created", () => {
      before(() => {
        cy.intercept("POST", "api/recipes", {
          fixture: "createRecipeResponse.json"
        });
        cy.get("[data-cy=submit-btn]").click();
      });
      it("is expected to show a success message", () => {
        cy.get("[data-cy=flash-message]").should(
          "contain",
          "Your recipe has been created"
        );
      });
    });
  });
  describe("can't be created with empty name field", () => {
    before(() => {
      cy.intercept("GET", "api/recipes*", {
        fixture: "myRecipesResponse.json"
      });
      cy.intercept("POST", "api/recipes", {
        statusCode: 422,
        fixture: "createWithoutName.json"
      });
      cy.intercept("GET", "api/ingredients", { body: { ingredients: [] } });
      cy.intercept("GET", "api/recipes", { body: { recipes: [] } });
      cy.visitAndAuthenticate();
      cy.get("[data-cy=my-recipes]").click();
      cy.get("[data-cy=create-recipe]").click();
      cy.get("[data-cy=instructions]").type("Mix them together. Bake");
      cy.get("[data-cy=submit-btn]").click();
    });

    it("is expected to see error message", () => {
      cy.get("[data-cy=flash-message]").should(
        "contain",
        "Name can't be blank"
      );
    });
  });

  describe("can't be created without an image", () => {
    before(() => {
      cy.intercept("GET", "api/recipes*", {
        fixture: "myRecipesResponse"
      });
      cy.intercept("POST", "api/recipes", {
        statusCode: 422,
        fixture: "createRecipeNoImageResponse"
      });
      cy.intercept("GET", "api/ingredients", { body: { ingredients: [] } });
      cy.intercept("GET", "api/recipes", { body: { recipes: [] } });
      cy.visitAndAuthenticate();
      cy.get("[data-cy=my-recipes]").click();
      cy.get("[data-cy=create-recipe]").click();
      cy.get("[data-cy=recipe-name]").type("Pancakes");
      cy.get("[data-cy=instructions]").type("Mix them together. Bake");
      cy.get("[data-cy=submit-btn]").click();
    });

    it("is expected to see error message", () => {
      cy.get("[data-cy=flash-message]").should(
        "contain",
        "A recipe must have an image"
      );
    });
  });

  describe("user can hide the Recipe create form", () => {
    before(() => {
      cy.get("[data-cy=hide-recipe]").click();
    });

    it("is expected to hide recipe name input field", () => {
      cy.get("[data-cy=recipe-name]").should("not.exist");
    });

    it("is expected to hide recipe instructions input field", () => {
      cy.get("[data-cy=instructions]").should("not.exist");
    });

    it("is expected to hide add another button", () => {
      cy.get("[data-cy=add-ingredient-line]").should("not.exist");
    });

    it("is expected to hide save button", () => {
      cy.get("[data-cy=submit-btn]").should("not.exist");
    });

    it("is expected to show Create Recipe button", () => {
      cy.get("[data-cy=create-recipe]").should("be.visible");
    });
  });
});
