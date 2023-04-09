import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localStorage";

export const rtkApi = createApi({
  // указываем редьюсер, в котором будут отображаться все данные rtk запрос(в редаксе)
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // указываем базовый урл
    baseUrl: __API__,
    // добавляем заголовки в каждый запрос
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || "";
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  // указываем пустые ендпоинты, чтоб потом их при вызове rtkApi указывать динамически с помощью injectEndpoints
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (builder) => ({}),
});
