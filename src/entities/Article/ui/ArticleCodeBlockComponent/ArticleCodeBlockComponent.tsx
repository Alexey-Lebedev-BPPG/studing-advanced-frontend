import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleCodeBlockComponent.module.scss";

interface IArticleCodeBlockComponentProps {
  className?: string;
}

export const ArticleCodeBlockComponent: FC<IArticleCodeBlockComponentProps> = ({
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.articleCodeBlockComponent, {}, [className])}>
      ArticleCodeBlockComponent
    </div>
  );
};
