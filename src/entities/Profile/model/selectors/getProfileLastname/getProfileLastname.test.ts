import { StateSchema } from "app/providers/StoreProvider";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { getProfileLastname } from "./getProfileLastname";

describe("getProfileLastname", () => {
  test("should return data", () => {
    const data = {
      username: "admin",
      age: 22,
      country: Country.Ukraine,
      lastname: "test",
      first: "asd",
      city: "asd",
      currency: Currency.USD,
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileLastname(state as StateSchema)).toEqual(data.lastname);
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileLastname(state as StateSchema)).toEqual(undefined);
  });
});