import { getIsFormComplete } from './getIsFormComplete';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getIsFormComplete', () => {
  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      stripePayment: {
        isFormComplete: true,
      },
    };
    expect(getIsFormComplete(state as StateSchema)).toEqual(true);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getIsFormComplete(state as StateSchema)).toEqual(false);
  });
});
