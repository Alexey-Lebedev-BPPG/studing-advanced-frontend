import { Country, Currency } from "shared/const/common";

export interface Profile {
  first: string;
  lastname: string;
  age: 22;
  currency: Currency;
  country: Country;
  city: string;
  username: string;
  avatar: string;
}

export interface ProfileSchema {
  isLoading: boolean;
  // определяем доступен ли пользователь для редактирования
  readonly: boolean;
  data?: Profile;
  error?: string;
}
