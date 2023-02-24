import { fetchArticleEditPage } from "../services/fetchArticleEditPage/fetchArticleEditPage";
import { ArticleEditPageSchema } from "../types/articleEditPage";
import {
  articleEditPageActions,
  articleEditPageReducer,
} from "./articleEditPage";

const data = {};

describe("articleEditPageSlice", () => {
  test("", () => {
    const state: DeepPartial<ArticleEditPageSchema> = {};
    expect(
      articleEditPageReducer(
        state as ArticleEditPageSchema,
        articleEditPageActions.set(true)
      )
    ).toEqual({});
  });

  // тестируем экстра редьюсеры
  // сначала тестируем pending состояние
  test("test articleEditPage service pending", () => {
    const state: DeepPartial<ArticleEditPageSchema> = {
      isLoading: false,
      error: "error",
    };
    expect(
      articleEditPageReducer(
        state as ArticleEditPageSchema,
        fetchArticleEditPage.pending
      )
    ).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  // далее тестируем fullfiled состояние
  test("test articleEditPage service fullfilled", () => {
    const state: DeepPartial<ArticleEditPageSchema> = {
      isLoading: true,
      error: "error",
    };
    expect(
      articleEditPageReducer(
        state as ArticleEditPageSchema,
        // передаем данные профиля в наш экшен
        fetchArticleEditPage.fulfilled(data, "")
      )
    ).toEqual({
      isLoading: false,
      error: undefined,
      data,
    });
  });
});
