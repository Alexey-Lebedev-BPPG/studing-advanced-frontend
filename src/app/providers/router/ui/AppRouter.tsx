import { FC, memo, Suspense, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import {
  AppRoutesProps,
  routeConfig,
} from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "widgets/PageLoader/PageLoader";
import { RequireAuth } from "./RequireAuth";

const AppRouter: FC = () => {
  // создаем функцию для перебора массива роутов
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    // создаем сам элемент, обернутый в suspense
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        // проверяем, если роут авторизован, то добавляем обертку защитника роута. Иначе просто рендерим элемент
        element={
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
