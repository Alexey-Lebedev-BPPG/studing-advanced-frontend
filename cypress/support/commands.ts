import { login } from "./commands/login";

// команды, которые можно зашить внутрь сайпреса и потом использовать
// добавляем команду запроса на авторизацию
Cypress.Commands.add("login", login);
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      // здесь определяем все команды, чтоб срабатывал автокомплит
      login(username: string, password: string): Chainable<void>;
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      // dismiss(
      //   subject: string,
      //   options?: Partial<TypeOptions>
      // ): Chainable<Element>;
      // visit(
      //   originalFn: CommandOriginalFn,
      //   url: string,
      //   options: Partial<VisitOptions>
      // ): Chainable<Element>;
    }
  }
}
export {};
