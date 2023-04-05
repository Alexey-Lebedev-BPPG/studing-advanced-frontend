import { StateSchema } from "app/providers/StoreProvider";

export const getProfileLastname = (state: StateSchema) =>
  state?.profile?.data?.lastname;
