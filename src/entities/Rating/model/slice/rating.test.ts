import { fetchRating } from "../services/fetchRating/fetchRating";
import { RatingSchema } from "../types/rating";
import { ratingActions, ratingReducer } from "./rating";

const data = {};

describe("ratingSlice", () => {
  test("", () => {
    const state: DeepPartial<RatingSchema> = {};
    expect(
      ratingReducer(state as RatingSchema, ratingActions.set(true))
    ).toEqual({});
  });

  // тестируем экстра редьюсеры
  // сначала тестируем pending состояние
  test("test rating service pending", () => {
    const state: DeepPartial<RatingSchema> = {
      isLoading: false,
      error: "error",
    };
    expect(ratingReducer(state as RatingSchema, fetchRating.pending)).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  // далее тестируем fullfiled состояние
  test("test rating service fullfilled", () => {
    const state: DeepPartial<RatingSchema> = {
      isLoading: true,
      error: "error",
    };
    expect(
      ratingReducer(
        state as RatingSchema,
        // передаем данные профиля в наш экшен
        fetchRating.fulfilled(data, "")
      )
    ).toEqual({
      isLoading: false,
      error: undefined,
      data,
    });
  });
});
