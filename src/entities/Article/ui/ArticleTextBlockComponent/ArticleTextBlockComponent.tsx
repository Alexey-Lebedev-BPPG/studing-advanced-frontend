import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleTextBlockComponent.module.scss";

interface IArticleTextBlockComponentProps {
  className?: string;
}

export const ArticleTextBlockComponent: FC<IArticleTextBlockComponentProps> = ({
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.articleTextBlockComponent, {}, [className])}>
      ArticleTextBlockComponent
    </div>
  );
};
