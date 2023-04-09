import { createAsyncThunk } from "@reduxjs/toolkit";
import i18next from "i18next";
import { ThunkConfig } from "@/app/providers/StoreProvider";

interface IArticleRatingProps {}

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта
// thunkAPI, в котором есть методы для использования в thunke
export const fetchArticleRating = createAsyncThunk<
  any,
  IArticleRatingProps,
  ThunkConfig<string>
>("***/articleRating", async (_, thunkApi) => {
  const { dispatch, extra, rejectWithValue, getState } = thunkApi;

  try {
    const response = await extra.api.post<any>("/***", {});
    // делаем доп. проверку получения данных
    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    console.log(error);
    // для обработки ошибок
    return rejectWithValue(i18next.t("ERROR"));
  }
});
