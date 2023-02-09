import { lazy } from "react";
// !Важно: для подгрузки импортируемый компонет должен экспортироваться ТОЛЬКО по дефолту
// так используем в реальных проектах
// *** export const MainPageAsync = lazy(() => import("./MainPage"));

// чтоб тестить в дев режиме при разработке:
export const ArticlesPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => resolve(import("./ArticlesPage")), 1500);
    })
);
// или включить задержку в devTools
