import { FC, memo, Suspense, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import {
  AppRoutesProps,
  routeConfig,
} from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "shared/ui/PageLoader";
import { RequireAuth } from "./RequireAuth";

const AppRouter: FC = () => {
  // создаем функцию для перебора массива роутов
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    // создаем сам элемент, обернутый в suspense
    const element = (
      <Suspense fallback={<PageLoader />}>
        <div className="page-wrapper">{route.element}</div>
      </Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        // проверяем, если роут авторизован, то добавляем обертку защитника роута. Иначе просто рендерим элемент
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
