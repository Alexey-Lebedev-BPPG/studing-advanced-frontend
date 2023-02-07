import { getUserAuthData } from "entities/User";
import { FC, memo, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "shared/ui/PageLoader";

const AppRouter: FC = () => {
  const isAuth = useSelector(getUserAuthData);

  const routes = useMemo(
    () =>
      Object.values(routeConfig).filter(
        (route) => !(route.authOnly && !isAuth)
      ),
    [isAuth]
  );

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* преобразовываем наш конфиг в массив */}
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<div className="page-wrapper">{element}</div>}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default memo(AppRouter);
