import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUserAuthData, getUserRoles } from "@/entities/User";
import { RoutePath } from "@/shared/const/router";
import { UserRole } from "../../../consts/consts";

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}
export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  // проверяем авторизован ли пользователь
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRequireRoles = useMemo(() => {
    if (!roles) return true;

    // проверяем, что в массиве есть хоть одно совпадение
    return roles.some((requireRole) => {
      // создаем переменную, которая указывает, что требуемая роль есть у пользователя
      const hasRole = userRoles?.includes(requireRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!auth)
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;

  if (!hasRequireRoles)
    return (
      <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />
    );

  return children;
};
