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
    cy.get("[data-cy=comment-field]").type("Awesome recipe");
  });

  describe("posts a comment", () => {
    before(() => {
      cy.intercept("GET", "/api/recipes/**", {
        fixture: "recipesShowWithNewCommentsResponse"
      });
      cy.get("[data-cy=post-comment-btn]").click();
    });

    it("is expected to display posted comment in the comment feed", () => {
      cy.get("[data-cy=comment-feed]")
        .children()
        .first()
        .within(() => {
          cy.get("[data-cy=comment-user-1]").should("contain", "John Skoglund");
          cy.get("[data-cy=comment-body-1]").should(
            "contain",
            "Awesome recipe"
          );
        });
    });

    it("is expected to clear comment field", () => {
      cy.get("[data-cy=comment-field]").should("have.value", "");
    });
  });
});
