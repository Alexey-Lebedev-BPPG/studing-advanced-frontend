import { getPaymentError } from './getPaymentError';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getPaymentError', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      stripePayment: {
        error: 'error',
      },
    };
    expect(getPaymentError(state as StateSchema)).toEqual('error');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getPaymentError(state as StateSchema)).toEqual(undefined);
  });
});
