import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";
import { UserRole } from "../consts/consts";

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

// делаем реселект, чтоб один раз при получении данных сразу получить состояние роли юзера
export const isUserAdmin = createSelector(
  getUserRoles,
  (roles) => Boolean(roles?.includes(UserRole.ADMIN))
  // eslint-disable-next-line function-paren-newline
);

export const isUserManager = createSelector(
  getUserRoles,
  (roles) => Boolean(roles?.includes(UserRole.MANAGER))
  // eslint-disable-next-line function-paren-newline
);
