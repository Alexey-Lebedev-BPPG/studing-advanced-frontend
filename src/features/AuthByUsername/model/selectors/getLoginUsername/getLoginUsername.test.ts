import { getLoginUsername } from "./getLoginUsername";
import { StateSchema } from "@/app/providers/StoreProvider";

describe("getLoginUsername", () => {
  test("should return value", () => {
    const state: DeepPartial<StateSchema> = { loginForm: { username: "123" } };
    expect(getLoginUsername(state as StateSchema)).toEqual("123");
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginUsername(state as StateSchema)).toEqual("");
  });
});
