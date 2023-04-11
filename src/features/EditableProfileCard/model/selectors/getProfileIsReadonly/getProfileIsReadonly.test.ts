import { getProfileIsReadonly } from "./getProfileIsReadonly";
import { StateSchema } from "@/app/providers/StoreProvider";

describe("getProfileIsReadonly", () => {
  test("should return data", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true,
      },
    };
    expect(getProfileIsReadonly(state as StateSchema)).toEqual(true);
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileIsReadonly(state as StateSchema)).toEqual(undefined);
  });
});
