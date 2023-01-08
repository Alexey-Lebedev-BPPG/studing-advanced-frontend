import { FC, lazy } from "react";
import { ILoginFormProps } from "./LoginForm";

// ставим типизацию пропсов для компонентов, обернутых в memo
export const LoginFormAsync = lazy<FC<ILoginFormProps>>(
  () =>
    // используем задержку только в учебных целях
    new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => resolve(import("./LoginForm")), 1500);
    })
);
