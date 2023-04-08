import { Profile } from "entities/Profile";
import { ValidateProfileError } from "../consts/consts";

export interface EditableProfileCardSchema {
  isLoading: boolean;
  data?: any;
  error?: string;
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
