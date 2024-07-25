describe("Company List Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the header", () => {
    cy.get("header").should("be.visible");
    cy.get("header").contains("Home");
  });

  it("should display the search bar", () => {
    cy.get(".search-bar").should("be.visible");
    cy.get('.search-bar input[type="text"]').should("be.visible");
  });

  it("should display companies in a list view by default", () => {
    cy.get(".company-list.list-group").should("be.visible");
    cy.get(".company-card").should("have.length.greaterThan", 0);
  });

  it("should switch to grid view when the button is clicked", () => {
    cy.get(".view-toggle button").contains("Grid View").click();
    cy.get(".company-list.row").should("be.visible");
  });

  it("should filter companies based on search input", () => {
    cy.get('.search-bar input[type="text"]').type("TechNova");
    cy.get(".company-card").should("have.length", 1);
    cy.get(".company-card").contains("TechNova Solutions");
  });

  it("should navigate to the company details page when a company is clicked", () => {
    cy.get(".company-card").first().click();
    cy.url().should("include", "/companies/");
    cy.get(".company-details").should("be.visible");
  });
});
