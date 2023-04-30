import { getProfileForm } from './getProfileForm';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getProfileForm', () => {
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
        form: data,
      },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
