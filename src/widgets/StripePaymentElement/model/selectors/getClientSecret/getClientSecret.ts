import { StateSchema } from '@/app/providers/StoreProvider';

export const getClientSecret = (state: StateSchema) =>
  state?.stripePayment?.clientSecret || '';

export const getIdPayment = (state: StateSchema) =>
  state?.stripePayment?.idPayment || '';

export const getAmountPayment = (state: StateSchema) =>
  state?.stripePayment?.amount || 0;
