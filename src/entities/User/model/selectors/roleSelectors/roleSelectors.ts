import { createSelector } from '@reduxjs/toolkit';
// eslint-disable-next-line path-checher-ulbi-example/layer-imports
import { UserRole } from '@/app/consts/consts';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

// делаем реселект, чтоб один раз при получении данных сразу получить состояние роли юзера
export const isUserAdmin = createSelector(getUserRoles, roles =>
  Boolean(roles?.includes(UserRole.ADMIN)),
);

export const isUserManager = createSelector(getUserRoles, roles =>
  Boolean(roles?.includes(UserRole.MANAGER)),
);
