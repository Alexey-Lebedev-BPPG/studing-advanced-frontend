import { getArticleEditPageIsLoading } from "./getArticleEditPage";
import { StateSchema } from "@/app/providers/StoreProvider";

describe("getArticleEditPage", () => {
  test("", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleEditPageIsLoading(state as StateSchema)).toEqual({});
  });
});
