import { User } from "@/entities/User";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localStorage";
import { selectByTestId } from "../../helpers/selectBiTestId";

// делаем запрос на авторизацию и возвращаем полученные данные
export const login = (username = "testuser", password = "123") => {
  return cy
    .request({
      method: "POST",
      url: "http://localhost:8000/login",
      body: { username, password },
    })
    .then(({ body }) => {
      window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
      return body;
    });
};

// чтоб каждый раз не делать команду по получению элемента по айди, создаем такой метод
export const getByTestId = (testId: string) => cy.get(selectByTestId(testId));

declare global {
  namespace Cypress {
    interface Chainable {
      // здесь определяем все команды, чтоб срабатывал автокомплит
      login(username?: string, password?: string): Chainable<User>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
