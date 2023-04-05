import { Profile } from "entities/Profile";

export interface EditableProfileCardSchema {
  isLoading: boolean;
  data?: any;
  error?: string;
}

export enum ValidateProfileError {
  INCORRECT_USER_DATA = "INCORRECT_USER_DATA",
  INCORRECT_AGE = "INCORRECT_AGE",
  INCORRECT_COUNTRY = "INCORRECT_COUNTRY",
  NO_DATA = "NO_DATA",
  SERVER_ERROR = "SERVER_ERROR",
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
