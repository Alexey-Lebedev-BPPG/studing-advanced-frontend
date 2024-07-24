import { getPayerName } from './getPaymentName';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getPayerName', () => {
  test('should return payerName', () => {
    const state: DeepPartial<StateSchema> = {
      stripePayment: {
        payerName: 'TestPayerName',
      },
    };
    expect(getPayerName(state as StateSchema)).toEqual('TestPayerName');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getPayerName(state as StateSchema)).toEqual('');
  });
});
