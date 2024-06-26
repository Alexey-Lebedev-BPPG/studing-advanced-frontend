import {
  // articleEditPageActions,
  articleEditPageReducer,
} from './articleEditPage';
import { fetchArticleEditPage } from '../services/fetchArticleEditPage/fetchArticleEditPage';
import { ArticleEditPageSchema } from '../types/articleEditPage';

// const data = {};

describe('articleEditPageSlice', () => {
  // eslint-disable-next-line jest/no-commented-out-tests
  // test("", () => {
  //   const state: DeepPartial<ArticleEditPageSchema> = {};
  //   expect(
  //     articleEditPageReducer(
  //       state as ArticleEditPageSchema,
  //       articleEditPageActions.set(true)
  //     )
  //   ).toEqual({});
  // });

  // тестируем экстра редьюсеры
  // сначала тестируем pending состояние
  test('articleEditPage service pending', () => {
    const state: DeepPartial<ArticleEditPageSchema> = {
      error: 'error',
      isLoading: false,
    };
    expect(
      articleEditPageReducer(
        state as ArticleEditPageSchema,
        fetchArticleEditPage.pending(''),
      ),
    ).toEqual({
      error: undefined,
      isLoading: true,
    });
  });

  // далее тестируем fulfilled состояние
  // eslint-disable-next-line jest/no-commented-out-tests
  // test("test articleEditPage service fulfilled", () => {
  //   const state: DeepPartial<ArticleEditPageSchema> = {
  //     isLoading: true,
  //     error: "error",
  //   };
  //   expect(
  //     articleEditPageReducer(
  //       state as ArticleEditPageSchema,
  //       // передаем данные профиля в наш экшен
  //       fetchArticleEditPage.fulfilled(data, "")
  //     )
  //   ).toEqual({
  //     isLoading: false,
  //     error: undefined,
  //     data,
  //   });
  // });
});
