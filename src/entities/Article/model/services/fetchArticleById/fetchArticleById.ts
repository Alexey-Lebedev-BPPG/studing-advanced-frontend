import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import i18next from "i18next";
import { Article } from "../../types/article";

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunke
export const fetchArticleById = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>("articleDetails/fetchArticleById", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Article>(`/articles/${articleId}`, {
      params: {
        _expand: "user",
      },
    });

    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    console.log(error);
    // для обработки ошибок
    return rejectWithValue(i18next.t("ARTICLE_ERROR"));
  }
});
