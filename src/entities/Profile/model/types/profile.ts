import { Country } from "entities/Country";
import { Currency } from "entities/Currency/model/types/currency";

export interface Profile {
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
}
