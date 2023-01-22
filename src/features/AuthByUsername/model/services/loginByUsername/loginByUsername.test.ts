import axios from "axios";
import { userActions } from "entities/User";
import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk/testAsyncThunk";
import { loginByUsername } from "./loginByUsername";

// мокаем аксиос, чтоб исп. в тестировании
jest.mock("axios");

// чтоб использовать не только модуль, но и все внутренности, мокаем глубоким способом (добавляем флаг true вторым аргументом в функцию mocked)
const mockedAxios = jest.mocked(axios, true);

describe("loginByUsername", () => {
  // I СПОСОБ (БЕЗ ПЕРЕИСПОЛЬЗОВАНИЯ)

  // // типизируем диспатч и получение стейта
  // let dispatch: Dispatch;
  // let getState: () => StateSchema;
  // // мокаем диспатч и getState перед каждым тестом
  // beforeEach(() => {
  //   // присваиваем им просто джестовские функции
  //   dispatch = jest.fn();
  //   getState = jest.fn();
  // });
  // test("success login", async () => {
  //   // данные, которые мы получать будем в рамках теста
  //   const userValue = { username: "123", id: "1" };
  //   // имитируем отправку post запроса, который возвращает валидные данные
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
  //   // вызов createAsyncThunk (функции loginByUsername) создает экшен и возвращает его
  //   const action = loginByUsername({ username: "123", password: "123" });
  //   // вызываем экшен, который принимает 3 аргумента: диспатч, getState и extra (которые нужно замокать)
  //   const result = await action(dispatch, getState, undefined);
  //   // убедимся, что в нашем loginByUsername вызвался диспатч, который там есть с данными, которые нам пришли с сервера
  //   expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
  //   // убедимся, что наш запрос вызвался
  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   // проверяем, что у нас диспатч вызвался 3 раза (т.к. он вызывается: первый раз - при вызове экшена loginByUsername; второй раз - внутри, когда вызываем с экшеном setAuthData; третий раз - когда экшен  loginByUsername успешно выполняется (когда делаем return))
  //   expect(dispatch).toHaveBeenCalledTimes(3);
  //   // проверим, что асинкфанк отработал без ошибки
  //   expect(result.meta.requestStatus).toBe("fulfilled");
  //   // проверяем, что сервер возвращает нам ожидаемые данные
  //   expect(result.payload).toEqual(userValue);
  // });
  // test("error login", async () => {
  //   // имитируем отправку post запроса, который возвращает нам ошибку
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
  //   // вызов createAsyncThunk (функции loginByUsername) создает экшен и возвращает его
  //   const action = loginByUsername({ username: "123", password: "123" });
  //   // вызываем экшен, который принимает 3 аргумента: диспатч, getState и extra (которые нужно замокать)
  //   const result = await action(dispatch, getState, undefined);
  //   // убедимся, что наш запрос вызвался
  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   // проверяем, что у нас диспатч вызвался 2 раза (т.к. не вызывается дипатч, который ретернет данные перед завершением loginByUsername)
  //   expect(dispatch).toHaveBeenCalledTimes(2);
  //   // проверим, что асинкфанк отработал c ошибкой
  //   expect(result.meta.requestStatus).toBe("rejected");
  //   // проверяем, что наш payload равен ошибке
  //   expect(result.payload).toEqual("error");
  // });

  // II СПОСОБ (ПЕРЕИСПОЛЬЗУЕМ КЛАСС)

  test("success login", async () => {
    // данные, которые мы получать будем в рамках теста
    const userValue = { username: "123", id: "1" };
    // имитируем отправку post запроса, который возвращает валидные данные
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
    // передаем наш thunk в наш класс
    const thunk = new TestAsyncThunk(loginByUsername);
    // вызывваем функцию внутри класса для создания экшена
    const result = await thunk.callThunk({ username: "123", password: "123" });

    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(userValue)
    );
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(userValue);
  });

  test("error login", async () => {
    // имитируем отправку post запроса, который возвращает нам ошибку
    mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    // передаем наш thunk в наш класс
    const thunk = new TestAsyncThunk(loginByUsername);
    // вызываем функцию внутри класса для создания экшена
    const result = await thunk.callThunk({ username: "123", password: "123" });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toEqual(undefined);
  });
});
