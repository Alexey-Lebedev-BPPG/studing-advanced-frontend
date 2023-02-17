import { StateSchema } from "app/providers/StoreProvider";
import { getAddCommentFormIsLoading } from "./getAddCommentForm";

describe("getAddCommentForm", () => {
  test("getAddCommentFormIsLoading", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getAddCommentFormIsLoading(state as StateSchema)).toEqual(undefined);
  });
});
