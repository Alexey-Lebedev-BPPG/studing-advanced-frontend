import { ValidateProfileError } from "../../consts/consts";
import { updateProfileData } from "./updateProfileData";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { TestAsyncThunk } from "@/shared/lib/tests/testAsyncThunk/testAsyncThunk";

const data = {
  id: "1",
  username: "admin",
  age: 22,
  country: Country.Ukraine,
  lastname: "test",
  first: "asd",
  city: "asd",
  currency: Currency.USD,
};

describe("updateProfileData", () => {
  test("success", async () => {
    // передаем наш thunk в наш класс и прокидуем инитиал стейт
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data },
    });
    // имитируем отправку put запроса, который возвращает валидные данные
    thunk.api.put.mockReturnValue(Promise.resolve({ data }));
    // вызываем функцию внутри класса для создания экшена (ничего не прокидываем туда, т.к. наш thunk ничего не принимает)
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("server error", async () => {
    // передаем наш thunk в наш класс и прокидуем инитиал стейт
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data },
    });
    // имитируем отправку put запроса, который возвращает нам ошибку
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
  });

  test("validate error", async () => {
    // передаем наш thunk в наш класс и прокидуем инитиал стейт
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: { ...data, lastname: "" } },
    });
    const result = await thunk.callThunk();
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
});
