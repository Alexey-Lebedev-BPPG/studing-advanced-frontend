import React, { FC } from "react";
import { Button } from "@/shared/ui/Button";
import cls from "./PageError.module.scss";

interface IPageErrorProps {}

export const PageError: FC<IPageErrorProps> = () => {
  const reloadPage = () => window.location.reload();

  return (
    <div className={cls.pageError}>
      <p>Произошла непредвиденная ошибка</p>
      <Button onClick={reloadPage}>Обновить страницу</Button>
    </div>
  );
};
