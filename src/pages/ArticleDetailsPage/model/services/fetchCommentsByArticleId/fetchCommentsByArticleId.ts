import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Comment } from "entities/Comment";
import i18next from "i18next";

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunke
export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>("articleDetails/fetchCommentsByArticleId", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  if (!articleId) return rejectWithValue(i18next.t("ARTICLE_ERROR"));
  try {
    const response = await extra.api.get<Comment[]>("/comments", {
      params: {
        articleId,
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
