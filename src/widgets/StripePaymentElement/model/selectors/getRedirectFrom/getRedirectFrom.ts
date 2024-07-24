import { StateSchema } from '@/app/providers/StoreProvider';

export const getRedirectFrom = (state: StateSchema) =>
  state?.stripePayment?.redirectFrom;
