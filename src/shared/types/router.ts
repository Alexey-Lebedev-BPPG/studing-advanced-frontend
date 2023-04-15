import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line path-checher-ulbi-example/layer-imports
import { UserRole } from '@/app/consts/consts';

// расширяем типизацию стандартных роутов, чтоб сделать роуты только для авторизованных пользователей
export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};
