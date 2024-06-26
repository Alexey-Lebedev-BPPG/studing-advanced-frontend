import {
  getProfileAge,
  getProfileCity,
  getProfileCountry,
  getProfileCurrency,
  getProfileData,
  getProfileError,
  getProfileFirstName,
  getProfileForm,
  getProfileIsLoading,
  getProfileIsReadonly,
  getProfileLastname,
  getProfileUsername,
  getProfileValidateErrors,
} from './getEditableProfileCard';
import { ValidateProfileError } from '../consts/consts';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getProfileAge', () => {
  const data = {
    age: 22,
    city: 'asd',
    country: 'Ukraine' as Country,
    currency: 'USD' as Currency,
    first: 'asd',
    lastname: 'test',
    username: 'admin',
  };

  test('should return data', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { data },
    };
    expect(getProfileAge(state as StateSchema)).toBe(data.age);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileAge(state as StateSchema)).toBeUndefined();
  });

  test('should return data for profile city', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { data },
    };
    expect(getProfileCity(state as StateSchema)).toBe(data.city);
  });

  test('should work with empty state for profile city', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileCity(state as StateSchema)).toBeUndefined();
  });

  test('should return data for profile country', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { data },
    };
    expect(getProfileCountry(state as StateSchema)).toBe(data.country);
  });

  test('should work with empty state for profile country', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileCountry(state as StateSchema)).toBeUndefined();
  });

  test('should return data for profile currency', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { data },
    };
    expect(getProfileCurrency(state as StateSchema)).toBe(data.currency);
  });

  test('should work with empty state for profile currency', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileCurrency(state as StateSchema)).toBeUndefined();
  });

  test('should return data for profile', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { data },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });

  test('should work with empty state for profile', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toBeUndefined();
  });

  test('should return data for profile error', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { error: '123' },
    };
    expect(getProfileError(state as StateSchema)).toBe('123');
  });

  test('should work with empty state for profile error', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileError(state as StateSchema)).toBeUndefined();
  });

  test('should return data for profile firstName', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { data },
    };
    expect(getProfileFirstName(state as StateSchema)).toBe(data.first);
  });

  test('should work with empty state for profile firstName', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileFirstName(state as StateSchema)).toBeUndefined();
  });

  test('should return data for profile form', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { form: data },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });

  test('should work with empty state for profile form', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toBeUndefined();
  });

  test('should return data for profile isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { isLoading: true },
    };
    expect(getProfileIsLoading(state as StateSchema)).toBe(true);
  });

  test('should work with empty state for profile isLoading', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileIsLoading(state as StateSchema)).toBeUndefined();
  });
  test('should return data for profile readonly', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { readonly: true },
    };
    expect(getProfileIsReadonly(state as StateSchema)).toBe(true);
  });

  test('should work with empty state for profile readonly', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileIsReadonly(state as StateSchema)).toBeUndefined();
  });

  test('should return data for profile lastname', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { data },
    };
    expect(getProfileLastname(state as StateSchema)).toBe(data.lastname);
  });

  test('should work with empty state for profile lastname', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileLastname(state as StateSchema)).toBeUndefined();
  });

  test('should return data for profile userName', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { data },
    };
    expect(getProfileUsername(state as StateSchema)).toBe(data.username);
  });

  test('should work with empty state for profile userName', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileUsername(state as StateSchema)).toBeUndefined();
  });

  test('should return data for profile validateError', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { validateError: [ValidateProfileError.INCORRECT_AGE] },
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.INCORRECT_AGE,
    ]);
  });

  test('should work with empty state for profile validateError', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toBeUndefined();
  });
});
