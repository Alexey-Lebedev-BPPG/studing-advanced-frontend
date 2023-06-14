// eslint-disable-next-line path-checher-ulbi-example/layer-imports
import { UserRole } from '@/app/consts/consts';
import { FeatureFlags } from '@/shared/types/featureFlags';

export interface User {
  avatar?: string;
  features?: FeatureFlags;
  id: string;
  roles?: UserRole[];
  username: string;
}

export interface UserSchema {
  // добавляем типизацию для поля, которое будет показывать состояние инициализации данных пользователя (т.е. пока данные не инициализированы - false, как только пройдет инициализация - true)
  _inited: boolean;
  authData?: User;
}
