import { StateSchema } from '@/app/providers/StoreProvider';

export const getPayerData = (state: StateSchema) =>
  state?.stripePayment?.payerData;
