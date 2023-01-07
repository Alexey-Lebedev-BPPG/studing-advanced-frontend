import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, userActions } from "entities/User";
import i18next from "i18next";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localStorage";

interface LoginByUsernameProps {
  username: string;
  password: string;
}

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunke
export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  { rejectValue: string }
>("login/loginByUsername", async ({ username, password }, thunkAPI) => {
  try {
    const response = await axios.post<User>("http://localhost:8000/login", {
      username,
      password,
    });
    // делаем доп. проверку получения данных
    if (!response.data) throw new Error();

    // добавляем данные в локальное хранилище (аналог токена)
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));

    // с помощью апи thunk вызываем диспатч с экшеном слайса
    thunkAPI.dispatch(userActions.setAuthData(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
    // для обработки ошибок
    return thunkAPI.rejectWithValue(i18next.t("LOGIN_ERROR"));
  }
});
