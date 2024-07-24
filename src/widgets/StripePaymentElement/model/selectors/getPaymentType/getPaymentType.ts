import { StateSchema } from '@/app/providers/StoreProvider';

export const getPaymentType = (state: StateSchema) =>
  state?.stripePayment?.paymentType;
