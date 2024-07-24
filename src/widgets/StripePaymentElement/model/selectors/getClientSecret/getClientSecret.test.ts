import { getClientSecret } from './getClientSecret';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getClientSecret', () => {
  test('should return secret', () => {
    const state: DeepPartial<StateSchema> = {
      stripePayment: {
        clientSecret: 'TestSecret',
      },
    };
    expect(getClientSecret(state as StateSchema)).toEqual('TestSecret');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getClientSecret(state as StateSchema)).toEqual('');
  });
});
