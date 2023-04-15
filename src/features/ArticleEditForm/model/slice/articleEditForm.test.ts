import { fetchArticleEditForm } from '../services/fetchArticleEditForm/fetchArticleEditForm';
import { ArticleEditFormSchema } from '../types/articleEditForm';
import {
  // articleEditFormActions,
  articleEditFormReducer,
} from './articleEditForm';

// const data = {};

describe('articleEditFormSlice', () => {
  // test("", () => {
  //   const state: DeepPartial<ArticleEditFormSchema> = {};
  //   expect(
  //     articleEditFormReducer(
  //       state as ArticleEditFormSchema,
  //       articleEditFormActions.set(true)
  //     )
  //   ).toEqual({});
  // });

  // тестируем экстра редьюсеры
  // сначала тестируем pending состояние
  test('test articleEditForm service pending', () => {
    const state: DeepPartial<ArticleEditFormSchema> = {
      isLoading: false,
      error: 'error',
    };
    expect(
      articleEditFormReducer(
        state as ArticleEditFormSchema,
        fetchArticleEditForm.pending,
      ),
    ).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  // далее тестируем fullfiled состояние
  // test("test articleEditForm service fullfilled", () => {
  //   const state: DeepPartial<ArticleEditFormSchema> = {
  //     isLoading: true,
  //     error: "error",
  //   };
  //   expect(
  //     articleEditFormReducer(
  //       state as ArticleEditFormSchema,
  //       // передаем данные профиля в наш экшен
  //       fetchArticleEditForm.fulfilled(data, "")
  //     )
  //   ).toEqual({
  //     isLoading: false,
  //     error: undefined,
  //     data,
  //   });
  // });
});
