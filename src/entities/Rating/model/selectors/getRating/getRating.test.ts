import { StateSchema } from "@/app/providers/StoreProvider";
import { getRatingIsLoading } from "./getRating";

describe("getRating", () => {
  test("", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getRatingIsLoading(state as StateSchema)).toEqual({});
  });
});
