import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsFormComplete = (state: StateSchema) =>
  state?.stripePayment?.isFormComplete || false;
