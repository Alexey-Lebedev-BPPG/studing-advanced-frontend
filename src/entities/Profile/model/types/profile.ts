import { Country } from "entities/Country";
import { Currency } from "entities/Currency/model/types/currency";

export enum ValidateProfileError {
  INCORRECT_USER_DATA = "INCORRECT_USER_DATA",
  INCORRECT_AGE = "INCORRECT_AGE",
  INCORRECT_COUNTRY = "INCORRECT_COUNTRY",
  NO_DATA = "NO_DATA",
  SERVER_ERROR = "SERVER_ERROR",
}

export interface Profile {
  id?: string;
  first?: string;
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}

export interface ProfileSchema {
  isLoading: boolean;
  // определяем доступен ли пользователь для редактирования
  readonly: boolean;
  data?: Profile;
  form?: Profile;
  error?: string;
  validateError?: ValidateProfileError[];
}
