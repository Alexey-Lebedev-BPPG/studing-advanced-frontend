import { StateSchema } from '@/app/providers/StoreProvider';

export const getPayerName = (state: StateSchema) =>
  state?.stripePayment?.payerName || '';
