import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import i18next from "i18next";

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunke
export const fetchArticlesList = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Article[]>("/articles", {
      params: {
        // чтоб получить полную сущность пользователя
        _expand: "user",
      },
    });

    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    // для обработки ошибок
    return rejectWithValue(i18next.t("ARTICLE_ERROR"));
  }
});
