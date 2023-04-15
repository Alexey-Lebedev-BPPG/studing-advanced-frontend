import { getProfileFirstname } from './getProfileFirstname';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getProfileFirstname', () => {
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
    expect(getProfileFirstname(state as StateSchema)).toEqual(data.first);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileFirstname(state as StateSchema)).toEqual(undefined);
  });
});
