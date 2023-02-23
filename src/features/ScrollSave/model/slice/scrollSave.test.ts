import { ScrollSaveSchema } from "../types/scrollSave";
import { scrollSaveActions, scrollSaveReducer } from "./scrollSave";

describe("scrollSaveSlice", () => {
  test("", () => {
    const state: DeepPartial<ScrollSaveSchema> = {};
    expect(
      scrollSaveReducer(
        state as ScrollSaveSchema,
        scrollSaveActions.setScrollPosition({ path: "test", position: 10 })
      )
    ).toEqual({});
  });
});
