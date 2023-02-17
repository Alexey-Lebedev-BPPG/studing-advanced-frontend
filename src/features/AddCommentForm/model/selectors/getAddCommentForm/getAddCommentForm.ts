import { StateSchema } from "app/providers/StoreProvider";

export const getAddCommentFormText = (state: StateSchema) =>
  state.addCommentForm?.text;
export const getAddCommentFormIsLoading = (state: StateSchema) =>
  state.addCommentForm?.isLoading;
export const getAddCommentFormError = (state: StateSchema) =>
  state.addCommentForm?.error;
