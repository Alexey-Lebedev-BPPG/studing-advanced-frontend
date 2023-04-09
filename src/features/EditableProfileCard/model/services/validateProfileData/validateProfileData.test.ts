import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { ValidateProfileError } from "../../consts/consts";
import { validateProfileData } from "./validateProfileData";

const data = {
  username: "admin",
  age: 22,
  country: Country.Ukraine,
  lastname: "test",
  first: "asd",
  city: "asd",
  currency: Currency.USD,
};

describe("validateProfileData", () => {
  test("should return data", () => {
    expect(validateProfileData(data)).toEqual([]);
  });

  test("without first and last name", () => {
    expect(validateProfileData({ ...data, first: "", lastname: "" })).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
    ]);
  });

  test("incorrect age", () => {
    expect(validateProfileData({ ...data, age: undefined })).toEqual([
      ValidateProfileError.INCORRECT_AGE,
    ]);
  });

  test("incorrect country", () => {
    expect(validateProfileData({ ...data, country: undefined })).toEqual([
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });

  test("incorrect all", () => {
    expect(validateProfileData({})).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });
});
