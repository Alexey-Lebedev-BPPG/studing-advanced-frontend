import { fetchArticleRating } from "../services/fetchArticleRating/fetchArticleRating";
import { ArticleRatingSchema } from "../types/articleRating";
import { articleRatingActions, articleRatingReducer } from "./articleRating";

const data = {};

describe("articleRatingSlice", () => {
  test("", () => {
    const state: DeepPartial<ArticleRatingSchema> = {};
    expect(
      articleRatingReducer(
        state as ArticleRatingSchema,
        articleRatingActions.set(true)
      )
    ).toEqual({});
  });

  // тестируем экстра редьюсеры
  // сначала тестируем pending состояние
  test("test articleRating service pending", () => {
    const state: DeepPartial<ArticleRatingSchema> = {
      isLoading: false,
      error: "error",
    };
    expect(
      articleRatingReducer(
        state as ArticleRatingSchema,
        fetchArticleRating.pending
      )
    ).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  // далее тестируем fullfiled состояние
  test("test articleRating service fullfilled", () => {
    const state: DeepPartial<ArticleRatingSchema> = {
      isLoading: true,
      error: "error",
    };
    expect(
      articleRatingReducer(
        state as ArticleRatingSchema,
        // передаем данные профиля в наш экшен
        fetchArticleRating.fulfilled(data, "")
      )
    ).toEqual({
      isLoading: false,
      error: undefined,
      data,
    });
  });
});
