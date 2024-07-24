import { getPaymentType } from './getPaymentType';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getPaymentType', () => {
  test('should return paymentType', () => {
    const state: DeepPartial<StateSchema> = {
      stripePayment: {
        paymentType: 'Card',
      },
    };
    expect(getPaymentType(state as StateSchema)).toEqual('Card');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getPaymentType(state as StateSchema)).toEqual(undefined);
  });
});
