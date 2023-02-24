import { StateSchema } from "app/providers/StoreProvider";
import { getArticleEditPageIsLoading } from "./getArticleEditPage";

describe("getArticleEditPage", () => {
  test("", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleEditPageIsLoading(state as StateSchema)).toEqual({});
  });
});
