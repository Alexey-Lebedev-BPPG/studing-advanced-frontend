import { classNames } from "shared/lib/classNames/classNames";
import { AppRouter } from "app/providers/router";
import { Navbar } from "widgets/Navbar";
import { SideBar } from "widgets/SideBar";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "entities/User";
import { useTheme } from "./providers/ThemeProvider";

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  // при инициализации приложения проверяем авторизованность юзера из локал стораджа
  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);
  return (
    <div className={classNames("app", {}, [theme])}>
      {/* оборачиваем приложение в Suspense, чтоб корректно работали переводы */}
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <SideBar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
