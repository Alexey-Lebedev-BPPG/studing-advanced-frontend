import { createSlice } from "@reduxjs/toolkit";
import { CounterSchema } from "../types/counterSchema";

const initialState: CounterSchema = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// экспортируем экшены по ум. и переприсваиваем их на новое значение
export const { actions: CounterActions } = counterSlice;
// экспортируем редьюсеры по ум. и переприсваиваем их на новое значение
export const { reducer: CounterReducer } = counterSlice;
