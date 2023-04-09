import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRating } from "../services/fetchRating/fetchRating";
import { RatingSchema } from "../types/rating";

const initialState: RatingSchema = {
  isLoading: false,
};

export const ratingSlice = createSlice({
  name: "rating",
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
      .addCase(fetchRating.pending, (state) => {
        // это состояние, когда наш thunk начинается
        // обнуляем ошибку, если она была и делаем isLoading true
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchRating.fulfilled, (state, action: PayloadAction<any>) => {
        // здесь обрабатываем ответ сервера
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchRating.rejected, (state, action) => {
        // action - поле, которое мы возвращаем из thunka при ошибке(3 аргумент в дженерике)
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: ratingActions } = ratingSlice;
export const { reducer: ratingReducer } = ratingSlice;
