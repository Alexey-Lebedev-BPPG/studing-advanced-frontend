import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchArticleRating } from "../services/fetchArticleRating/fetchArticleRating";
import { ArticleRatingSchema } from "../types/articleRating";

const initialState: ArticleRatingSchema = {
  isLoading: false,
};

export const articleRatingSlice = createSlice({
  name: "articleRating",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  // исgользуется для асинхронного изменения стейта
  extraReducers: (builder) => {
    // у каждого thunka есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
    // все 3 состояния можно здесь обработать
    builder
      // используем наш thunk
      .addCase(fetchArticleRating.pending, (state) => {
        // это состояние, когда наш thunk начинается
        // обнуляем ошибку, если она была и делаем isLoading true
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleRating.fulfilled,
        (state, action: PayloadAction<any>) => {
          // здесь обрабатываем ответ сервера
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchArticleRating.rejected, (state, action) => {
        // action - поле, которое мы возвращаем из thunka при ошибке(3 аргумент в дженерике)
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleRatingActions } = articleRatingSlice;
export const { reducer: articleRatingReducer } = articleRatingSlice;
