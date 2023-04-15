import { ValidateProfileError } from '../../consts/consts';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getProfileValidateErrors', () => {
  test('should return data', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateError: [ValidateProfileError.INCORRECT_AGE],
      },
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.INCORRECT_AGE,
    ]);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
