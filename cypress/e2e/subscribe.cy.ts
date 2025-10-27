describe("Newsletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
    cy.viewport(1366, 768)
  })

  it("allows users to subscribe to the email list", () => {
    cy.getByData("email-input").type("tom@aol.com")
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("exist").contains("tom@aol.com")
  })

  it("does NOT allow an invalid email adress", () => {
    cy.getByData("email-input").type("tom")
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("not.exist")
  })

  it("does NOT allow already subscribed email addresses", () => {
    cy.getByData("email-input").type("john@example.com")
    cy.getByData("submit-button").click()
    cy.getByData("server-error-message")
      .should("exist")
      .contains("already exists. Please use a different email address.")
  })

  it.only("Does NOT allow registration without email", () => {
    cy.getByData("email-input")
    cy.getByData("submit-button").click()
    cy.getByData("error-message").should("exist").contains("Email is required")
  })
})
