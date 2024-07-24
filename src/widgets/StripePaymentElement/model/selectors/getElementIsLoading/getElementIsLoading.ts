import { StateSchema } from '@/app/providers/StoreProvider';

export const getElementIsLoading = (state: StateSchema) =>
  state?.stripePayment?.isLoading || false;
