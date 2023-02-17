import { FC, lazy } from "react";
import { IAddCommentFormProps } from "./AddCommentForm";
// !Важно: для подгрузки импортируемый компонет должен экспортироваться ТОЛЬКО по дефолту
// так используем в реальных проектах
// *** export const MainPageAsync = lazy(() => import('./MainPage'));

// чтоб тестить в дев режиме при разработке:
export const AddCommentFormAsync = lazy<FC<IAddCommentFormProps>>(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => resolve(import("./AddCommentForm")), 1500);
    })
);
// или включить задержку в devTools
