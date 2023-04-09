import { StateSchema } from "@/app/providers/StoreProvider";

export const getProfileCurrency = (state: StateSchema) =>
  state?.profile?.data?.currency;
