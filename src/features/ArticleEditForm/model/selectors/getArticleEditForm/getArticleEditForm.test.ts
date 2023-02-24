import { StateSchema } from "app/providers/StoreProvider";
import { getArticleEditFormIsLoading } from "./getArticleEditForm";

describe("getArticleEditForm", () => {
  test("", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleEditFormIsLoading(state as StateSchema)).toEqual({});
  });
});
