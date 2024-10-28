describe('ingredient addition tests in the constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
    cy.get('[data-cy=bun-ingredients]').as('bunIng');
    cy.get('[data-cy=mains-ingredients]').as('mainIng');
    cy.get('[data-cy=sauces-ingredients]').as('sauceIng');
    cy.get('[data-cy=constructor-ingredients]').as('constructorIng');
  });

  //ТЕСТЫ ДОБАВЛЕНИЯ И УДАЛЕНИЯ ИНГРЕДИЕНТОВ
  it('should add bun', () => {
    cy.get('@bunIng').contains('Добавить').click();
    cy.get('[data-cy="constructor-bun"]')
      .contains('Ингредиент 1')
      .should('exist');
  });

  it('should add main ingredient and sauce', () => {
    cy.get('@mainIng').contains('Добавить').click();
    cy.get('@sauceIng').contains('Добавить').click();
    cy.get('@constructorIng').contains('Ингредиент 2').should('exist');
    cy.get('@constructorIng').contains('Ингредиент 4').should('exist');
  });
});

//ТЕСТЫ МОДАЛЬНОГО ОКНА
describe('modal window functionality tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
    cy.get('#modals').as('modals');
  });

  it('should open modal window', () => {
    cy.contains('Ингредиент 1').click();
    cy.get('@modals').contains('Ингредиент 1').should('exist');
  });

  it('should close modal by clicking on the close button', () => {
    cy.contains('Ингредиент 1').click();
    cy.get('@modals').find('button[aria-label="Закрыть"]').click();
    cy.get('@modals').contains('Ингредиент 1').should('not.exist');
  });

  it('should close modal by clicking on overlay', () => {
    cy.contains('Ингредиент 1').click();
    cy.get('@modals').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.get('@modals').contains('Ингредиент 1').should('not.exist');
  });
});

//ТЕСТЫ ЗАКАЗА
describe('order creation tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccessToken');
    cy.viewport(1300, 800);
    cy.visit('/');
    cy.get('[data-cy=bun-ingredients]').as('bunIng');
    cy.get('[data-cy=mains-ingredients]').as('mainIng');
    cy.get('[data-cy=sauces-ingredients]').as('sauceIng');
    cy.get('[data-cy=constructor-ingredients]').as('constructorIng');
  });

  it('should add ingredients and create an order', () => {
    cy.get('@bunIng').contains('Добавить').click();
    cy.get('@mainIng').contains('Добавить').click();
    cy.get('@sauceIng').contains('Добавить').click();
    cy.get('[data-cy=order-summ]').click();

    cy.get('[data-cy=modal]').as('modal');
    cy.get('#modals').as('modals');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', '123456');
    cy.get('@modals').find('button[aria-label="Закрыть"]').click();
    cy.get('@modal').should('not.exist');

    cy.get('@constructorIng').contains('Ингредиент 1').should('not.exist');
    cy.get('@constructorIng').contains('Ингредиент 2').should('not.exist');
    cy.get('@constructorIng').contains('Ингредиент 4').should('not.exist');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
