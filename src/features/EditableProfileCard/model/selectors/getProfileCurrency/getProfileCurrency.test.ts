import { getProfileCurrency } from './getProfileCurrency';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getProfileCurrency', () => {
  test('should return data', () => {
    const data = {
      username: 'admin',
      age: 22,
      country: Country.Ukraine,
      lastname: 'test',
      first: 'asd',
      city: 'asd',
      currency: Currency.USD,
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
