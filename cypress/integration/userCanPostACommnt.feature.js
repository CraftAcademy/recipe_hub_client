/* eslint-disable no-undef */
describe("User", () => {
  before(() => {
    cy.intercept("GET", "/api/recipes", {
      fixture: "recipesIndexResponse"
    });
    cy.intercept("GET", "/api/recipes/**", {
      fixture: "recipesShowResponse"
    });
    cy.intercept("POST", "/api/recipes/**/comments", {
      fixture: "createCommentResponse"
    });
    cy.visitAndAuthenticate();
    cy.get("[data-cy=recipe-card-1]").click();
    cy.get("[data-cy=comment-field]").type("Loved this recipe");
    cy.get("[data-cy=post-comment-btn]").click();
  });

  it("is expected to display posted comment in the comment feed", () => {
    cy.get("[data-cy=comment-feed]")
      .children()
      .first()
      .should("contain", "Loved this recipe");
  });
});
