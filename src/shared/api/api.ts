import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localStorage";

// создаем экземпляр аксиоса
export const $api = axios.create({
  // URL, на котором бэк (берем из глобальных перемнных)
  baseURL: __API__,
  // указываем загловок авторизации (из бэка)
  headers: {
    authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || "",
  },
});
