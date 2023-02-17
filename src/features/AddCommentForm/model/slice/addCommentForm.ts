import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddCommentFormSchema } from "../types/addCommentForm";

const initialState: AddCommentFormSchema = {
  isLoading: false,
  text: "",
};

export const addCommentFormSlice = createSlice({
  name: "addCommentForm",
  initialState,
  reducers: {
    setText: (state, { payload }: PayloadAction<string>) => {
      state.text = payload;
    },
  },
  // исgользуется для асинхронного изменения стейта
  // extraReducers: (builder) => {
  //   // у каждого thunka есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
  //   // все 3 состояния можно здесь обработать
  //   builder
  //     // используем наш thunk
  //     .addCase(sendComment.pending, (state) => {
  //       // это состояние, когда наш thunk начинается
  //       // обнуляем ошибку, если она была и делаем isLoading true
  //       state.error = undefined;
  //       state.isLoading = true;
  //     })
  //     .addCase(sendComment.fulfilled, (state, action: PayloadAction<any>) => {
  //       // здесь обрабатываем ответ сервера
  //       state.isLoading = false;
  //       // state.data = action.payload;
  //     })
  //     .addCase(sendComment.rejected, (state, action) => {
  //       // action - поле, которое мы возвращаем из thunka при ошибке(3 аргумент в дженерике)
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
