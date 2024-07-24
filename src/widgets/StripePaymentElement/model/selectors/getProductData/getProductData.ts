import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductData = (state: StateSchema) =>
  state?.stripePayment?.productData;
