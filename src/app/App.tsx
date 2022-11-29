import "./styles/index.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "app/providers/router";
import { Navbar } from "widgets/Navbar";
import { SideBar } from "widgets/SideBar";
import { Suspense } from "react";

function App() {
  const { theme } = useTheme();

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
