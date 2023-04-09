import { StateSchema } from "@/app/providers/StoreProvider";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { getProfileUsername } from "./getProfileUsername";

describe("getProfileUsername", () => {
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
    expect(getProfileUsername(state as StateSchema)).toEqual(data.username);
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileUsername(state as StateSchema)).toEqual(undefined);
  });
});
