import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { getLoginState } from "./getLoginState";

describe("getLoginState", () => {
  test("should return value", () => {
    const state: DeepPartial<StateSchema> = { loginForm: { password: "123" } };
    expect(getLoginState(state as StateSchema)).toEqual({ password: "123" });
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginState(state as StateSchema)).toEqual(undefined);
  });
});
