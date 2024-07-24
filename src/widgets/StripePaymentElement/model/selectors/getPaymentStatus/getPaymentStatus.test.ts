import { getPaymentStatus } from './getPaymentStatus';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getPaymentStatus', () => {
  test('should return paymentStatus', () => {
    const state: DeepPartial<StateSchema> = {
      stripePayment: {
        status: 'paymentSucceeded',
      },
    };
    expect(getPaymentStatus(state as StateSchema)).toEqual('paymentSucceeded');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getPaymentStatus(state as StateSchema)).toEqual(undefined);
  });
});
