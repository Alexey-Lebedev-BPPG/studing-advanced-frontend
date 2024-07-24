import { StateSchema } from '@/app/providers/StoreProvider';

export const getPaymentError = (state: StateSchema) =>
  state?.stripePayment?.error;
