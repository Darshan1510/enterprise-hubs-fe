describe("Company Details Page", () => {
  beforeEach(() => {
    // Navigate to a specific company's details page
    cy.visit("http://localhost:3000/companies/1");
  });

  it("should display the back to list button", () => {
    cy.get("button").contains("Back to List").should("be.visible");
  });

  it("should display company details", () => {
    cy.get(".company-details").should("be.visible");
    cy.get(".company-details h2").should("contain.text", "TechNova Solutions");
  });

  it("should display the map with locations", () => {
    cy.get(".map-container").should("be.visible");
    cy.get(".leaflet-container").should("be.visible");
  });

  it("should display the locations list", () => {
    cy.get(".company-details h3").contains("Locations").should("be.visible");
    cy.get(".list-group-item").should("have.length.greaterThan", 0);
  });
});
