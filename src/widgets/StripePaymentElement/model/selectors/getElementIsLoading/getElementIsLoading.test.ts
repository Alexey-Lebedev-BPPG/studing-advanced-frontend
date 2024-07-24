import { getElementIsLoading } from './getElementIsLoading';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getElementIsLoading', () => {
  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      stripePayment: {
        isLoading: true,
      },
    };
    expect(getElementIsLoading(state as StateSchema)).toEqual(true);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getElementIsLoading(state as StateSchema)).toEqual(false);
  });
});
