import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRole } from '../../../consts/consts';
import { getUserAuthData, getUserRoles } from '@/entities/User';
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

// не используем memo в компонентах, где у нас есть children
export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  // проверяем авторизован ли пользователь
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRequireRoles = useMemo(() => {
    if (!roles) return true;

    // проверяем, что в массиве есть хоть одно совпадение
    return roles.some(requireRole => {
      // создаем переменную, которая указывает, что требуемая роль есть у пользователя
      const hasRole = userRoles?.includes(requireRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!auth)
    return <Navigate replace to={getRouteMain()} state={{ from: location }} />;

  if (!hasRequireRoles)
    return (
      <Navigate replace to={getRouteForbidden()} state={{ from: location }} />
    );

  return children;
};
