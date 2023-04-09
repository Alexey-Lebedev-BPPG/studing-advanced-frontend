import { StateSchema } from "@/app/providers/StoreProvider";
import { getArticleRatingIsLoading } from "./getArticleRating";

describe("getArticleRating", () => {
  test("", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleRatingIsLoading(state as StateSchema)).toEqual({});
  });
});
