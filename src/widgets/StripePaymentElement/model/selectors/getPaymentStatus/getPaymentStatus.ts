import { StateSchema } from '@/app/providers/StoreProvider';

export const getPaymentStatus = (state: StateSchema) =>
  state?.stripePayment?.status;
