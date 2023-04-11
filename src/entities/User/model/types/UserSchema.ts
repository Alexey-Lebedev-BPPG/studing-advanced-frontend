import { UserRole } from "@/app/consts/consts";

export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles?: UserRole[];
}

export interface UserSchema {
  authData?: User;
  // добавляем типизацию для поля, которое будет показывать состояние инициализации данных пользователя (т.е. пока данные не инициализированы - false, как только пройдет инициализация - true)
  _inited: boolean;
}
