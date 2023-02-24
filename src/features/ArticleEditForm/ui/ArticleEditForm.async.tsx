import { FC, lazy } from "react";
import { IArticleEditFormProps } from "./ArticleEditForm";
// !Важно: для подгрузки импортируемый компонет должен экспортироваться ТОЛЬКО по дефолту
// так используем в реальных проектах
// *** export const MainPageAsync = lazy(() => import('./MainPage'));

// чтоб тестить в дев режиме при разработке:
export const ArticleEditFormAsync = lazy<FC<IArticleEditFormProps>>(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => resolve(import("./ArticleEditForm")), 1500);
    })
);
// или включить задержку в devTools
