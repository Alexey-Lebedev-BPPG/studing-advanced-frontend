import { FC, lazy } from "react";
import { IArticleEditPageProps } from "./ArticleEditPage";
// !Важно: для подгрузки импортируемый компонет должен экспортироваться ТОЛЬКО по дефолту
// так используем в реальных проектах
// *** export const MainPageAsync = lazy(() => import('./MainPage'));

// чтоб тестить в дев режиме при разработке:
export const ArticleEditPageAsync = lazy<FC<IArticleEditPageProps>>(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => resolve(import("./ArticleEditPage")), 1500);
    })
);
// или включить задержку в devTools
