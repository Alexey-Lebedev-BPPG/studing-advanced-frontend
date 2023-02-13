import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleImageBlockComponent.module.scss";

interface IArticleImageBlockComponentProps {
  className?: string;
}

export const ArticleImageBlockComponent: FC<IArticleImageBlockComponentProps> =
  ({ className }) => {
    const { t } = useTranslation();

    return (
      <div
        className={classNames(cls.articleImageBlockComponent, {}, [className])}
      >
        ArticleImageBlockComponent
      </div>
    );
  };
