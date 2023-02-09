import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk/testAsyncThunk";
import { fetchProfileData } from "./fetchProfileData";

const data = {
  username: "admin",
  age: 22,
  country: Country.Ukraine,
  lastname: "test",
  first: "asd",
  city: "asd",
  currency: Currency.USD,
};

describe("fetchProfileData", () => {
  test("success", async () => {
    // передаем наш thunk в наш класс
    const thunk = new TestAsyncThunk(fetchProfileData);
    // имитируем отправку get запроса, который возвращает валидные данные
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    // вызываем функцию внутри класса для создания экшена (ничего не прокидываем туда, т.к. наш thunk ничего не принимает)
    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("error", async () => {
    // передаем наш thunk в наш класс
    const thunk = new TestAsyncThunk(fetchProfileData);
    // имитируем отправку post запроса, который возвращает нам ошибку
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();
    expect(result.meta.requestStatus).toBe("rejected");
  });
});
