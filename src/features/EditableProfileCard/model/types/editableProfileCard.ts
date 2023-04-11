import { ValidateProfileError } from "../consts/consts";
import { Profile } from "@/entities/Profile";

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
