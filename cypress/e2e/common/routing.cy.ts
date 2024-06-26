import { selectByTestId } from '../../helpers/selectBiTestId';

describe('Роутинг', () => {
  describe('Пользователь не авторизован', () => {
    // eslint-disable-next-line jest/expect-expect
    it('Переход на главную страницу', () => {
      cy.visit('/');
      // в should задается спец строка(в подсказках), указывающая, что нужно проверить (в данном случае проверяем существование элемента на странице)
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    // eslint-disable-next-line jest/expect-expect
    it('Переход открывает страницу пользователя', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    // eslint-disable-next-line jest/expect-expect
    it('Переход открывает несуществующую страницу', () => {
      cy.visit('/testTest');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });

  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      // авторизовываемся своим запросом, который написали в support/commands/login.ts
      cy.login('admin', '123');
    });
    // eslint-disable-next-line jest/expect-expect
    it('Переход открывает страницу пользователя', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });
    // eslint-disable-next-line jest/expect-expect
    it('Переход открывает страницу со списком статей', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });
});
