describe('Constructor Page Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(4000, 800);
    cy.visit('http://localhost:4000');
  });

  // ДОБАВИТЬ И УДАЛИТЬ ИНГРЕДИЕНТЫ
  it('Should add bun to the constructor', () => {
    cy.get('[data-cy="bun-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-bun"]')
      .contains('Ингредиент 1')
      .should('exist');
  });

  it('Should add ingredients to the constructor', () => {
    cy.get('[data-cy="mains-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="sauces-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-ingredients"]')
      .contains('Ингредиент 2')
      .should('exist');
    cy.get('[data-cy="constructor-ingredients"]')
      .contains('Ингредиент 4')
      .should('exist');
  });

  // ТЕСТЫ МОДАЛЬНОГО ОКНА
  it('Should open modal on ingredient click', () => {
    cy.contains('Ингредиент 1').click();
    cy.get('#modals').contains('Ингредиент 1').should('exist');
  });

  it('Should close modal', () => {
    cy.contains('Ингредиент 1').click();
    cy.get('#modals').contains('Ингредиент 1').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('#modals').contains('Ингредиент 1').should('not.exist');
  });

  it('Should close modal overlay', () => {
    cy.contains('Ингредиент 1').click();
    cy.get('#modals').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.get('#modals').contains('Ингредиент 1').should('not.exist');
  });

  // ТЕСТЫ ЗАКАЗА
  describe('Order Modal', function () {
    beforeEach(function () {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
        'postOrder'
      );

      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('test-refreshToken')
      );
      cy.setCookie('accessToken', 'test-accessToken');
      cy.viewport(4000, 800);
      cy.visit('http://localhost:4000');
    });

    afterEach(function () {
      cy.clearLocalStorage();
      cy.clearCookies();
    });

    it('should order burger', function () {
      cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=order-summ]').click();

      cy.get('[data-cy=modal]').as('modal');
      cy.get('@modal').should('exist');
      cy.get('@modal').should('contain', '123456');
      cy.get('#modals button[aria-label="Закрыть"]').click();
      cy.get('@modal').should('not.exist');

      cy.get('[data-cy="burger-constructor"]').as('constructor');
      cy.get('@constructor').should('not.contain', 'Ингридиент 1');
      cy.get('@constructor').should('not.contain', 'Ингридиент 2');
      cy.get('@constructor').should('not.contain', 'Ингридиент 4');
    });
  });
});
