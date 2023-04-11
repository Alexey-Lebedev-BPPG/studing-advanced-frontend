import { getProfileCity } from "./getProfileCity";
import { StateSchema } from "@/app/providers/StoreProvider";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";

describe("getProfileCity", () => {
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
    expect(getProfileCity(state as StateSchema)).toEqual(data.city);
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileCity(state as StateSchema)).toEqual(undefined);
  });
});
