import { FC } from "react";
import { useTranslation } from "react-i18next";
import cls from "./NotFoundPage.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";

interface INotFoundPageProps {
  className?: string;
}

export const NotFoundPage: FC<INotFoundPageProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.notFoundPage, {}, [className])}>
      {t("Страница не найдена")}
    </div>
  );
};
