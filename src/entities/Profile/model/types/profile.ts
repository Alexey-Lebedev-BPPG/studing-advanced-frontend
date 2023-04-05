import { Country } from "entities/Country";
import { Currency } from "entities/Currency/model/types/currency";

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
