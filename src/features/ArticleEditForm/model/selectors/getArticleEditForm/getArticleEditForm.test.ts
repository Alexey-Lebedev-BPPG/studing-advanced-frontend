import { getArticleEditFormIsLoading } from "./getArticleEditForm";
import { StateSchema } from "@/app/providers/StoreProvider";

describe("getArticleEditForm", () => {
  test("", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleEditFormIsLoading(state as StateSchema)).toEqual({});
  });
});
