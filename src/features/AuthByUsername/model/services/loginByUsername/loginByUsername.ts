import { createAsyncThunk } from "@reduxjs/toolkit";
import i18next from "i18next";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { User, userActions } from "@/entities/User";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localStorage";

interface LoginByUsernameProps {
  username: string;
  password: string;
}

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunke
export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>("login/loginByUsername", async ({ username, password }, thunkApi) => {
  const { dispatch, extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<User>("/login", {
      username,
      password,
    });
    // делаем доп. проверку получения данных
    if (!response.data) throw new Error();

    // добавляем данные в локальное хранилище (аналог токена)
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));

    // с помощью апи thunk вызываем диспатч с экшеном слайса
    dispatch(userActions.setAuthData(response.data));

    // можем сделать переход после авторизации
    // extra.navigate("/about");

    return response.data;
  } catch (error) {
    console.log(error);
    // для обработки ошибок
    return rejectWithValue(i18next.t("LOGIN_ERROR"));
  }
});
