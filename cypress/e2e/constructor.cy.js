const baseUrl = "https://norma.nomoreparties.space/api/";
const host = "http://localhost:3000"

describe("testing constructor", () => {
  beforeEach( () => {
    cy.intercept("GET", `${baseUrl}ingredients`, {fixture: "ingredients.json"});
    cy.viewport(1300, 800);
    cy.visit(host);
  })

  it("should drag and drop ingredients", () => {
    cy.get("[data-cy=ingredients]")
      .contains("Краторная булка N-200i")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-bun-1]")
      .contains("Краторная булка N-200i")
      .should("exist");
    cy.get("[data-cy=constructor-bun-2]")
      .contains("Краторная булка N-200i")
      .should("exist");

    cy.get("[data-cy=ingredients]")
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=ingredients]")
      .contains("Соус Spicy-X")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-element]")
      .contains("Биокотлета из марсианской Магнолии")
      .should("exist");
    cy.get("[data-cy=constructor-element]")
      .contains("Соус Spicy-X")
      .should("exist");
  });
});
describe("testing ingredient popup window", () => {
  beforeEach( () => {
    cy.intercept("GET", `${baseUrl}ingredients`, {fixture: "ingredients.json"});
    cy.viewport(1300, 800);
    cy.visit(host);
  });
  it("check popup is open", () => {
    cy.contains("Детали ингредиента").should("not.exist");
    cy.contains("Соус Spicy-X").click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get("#modal-root").contains("Соус Spicy-X").should("exist");
  });
  it("check popup closing", () => {
    cy.contains("Соус Spicy-X").click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get("#modal-root [data-cy=close-icon-popup]").click();
    cy.contains("Детали ингредиента").should("not.exist");
  })
  it('check popup closing by overlay', () => {
    cy.contains("Соус Spicy-X").click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get("#modal-root [data-cy=close-by-overlay]").click({force: true});
    cy.contains("Детали ингредиента").should("not.exist");
  })
})
describe("making order works correct", () => {
  beforeEach(() => {
    cy.intercept("GET", `${baseUrl}ingredients`, {fixture: "ingredients.json"});
    cy.intercept("GET", `${baseUrl}auth/user`, {fixture: "user.json"});
    cy.intercept("POST", `${baseUrl}orders`, {fixture: "post_order.json"}).as("order");
    window.localStorage.setItem("accessToken", "test_accessToken")
    window.localStorage.setItem("refreshToken", "test_refreshToken")
    cy.viewport(1300, 800);
    cy.visit(host);
  });
  afterEach(() => {
    cy.clearCookies();
  });
  it('should create order', () => {
    cy.get("[data-cy=ingredients]")
      .contains("Краторная булка N-200i")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-bun-1]")
      .contains("Краторная булка N-200i")
    cy.get("[data-cy=constructor-bun-2]")
      .contains("Краторная булка N-200i")
    cy.get("[data-cy=ingredients]")
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=ingredients]")
      .contains("Соус Spicy-X")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-element]")
      .contains("Биокотлета из марсианской Магнолии")
    cy.get("[data-cy=constructor-element]")
      .contains("Соус Spicy-X")
    cy.get("[data-cy=constructor-order]").click();
    cy.get("#modal-root [data-cy=order-number]").contains("123456").should("exist");
    cy.get("#modal-root [data-cy=close-icon-popup]").click();
    cy.contains("идентификатор заказа").should("not.exist");
    cy.get("[data-cy=constructor]")
      .contains("Краторная булка N-200i")
      .should("not.exist");
    cy.get("[data-cy=constructor]")
      .contains("Соус Spicy-X")
      .should("not.exist");
    cy.get("[data-cy=constructor]")
      .contains("Биокотлета из марсианской Магнолии")
      .should("not.exist");
  })
})