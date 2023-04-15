import { getAddCommentFormIsLoading } from './getAddCommentForm';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getAddCommentForm', () => {
  test('getAddCommentFormIsLoading', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getAddCommentFormIsLoading(state as StateSchema)).toEqual(undefined);
  });
});
