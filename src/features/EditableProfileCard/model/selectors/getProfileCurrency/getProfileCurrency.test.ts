import { getProfileCurrency } from './getProfileCurrency';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getProfileCurrency', () => {
  test('should return data', () => {
    const data = {
      age: 22,
      city: 'asd',
      country: Country.Ukraine,
      currency: Currency.USD,
      first: 'asd',
      lastname: 'test',
      username: 'admin',
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileCurrency(state as StateSchema)).toEqual(data.currency);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileCurrency(state as StateSchema)).toEqual(undefined);
  });
});
