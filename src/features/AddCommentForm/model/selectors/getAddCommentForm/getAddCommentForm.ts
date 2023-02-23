import { StateSchema } from "app/providers/StoreProvider";

export const getAddCommentFormText = (state: StateSchema) =>
  // используем оператор ??, чтоб пустая строка испоользовалась только тогда, когда левый оператор null или undefined
  state.addCommentForm?.text ?? "";

export const getAddCommentFormIsLoading = (state: StateSchema) =>
  state.addCommentForm?.isLoading;

export const getAddCommentFormError = (state: StateSchema) =>
  state.addCommentForm?.error;
