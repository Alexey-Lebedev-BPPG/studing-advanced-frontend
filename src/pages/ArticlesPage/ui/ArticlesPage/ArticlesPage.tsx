import { ArticleList } from "entities/Article";
import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticlesPage.module.scss";

interface IArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<IArticlesPageProps> = ({ className }) => (
  <div className={classNames(cls.articlesPage, {}, [className])}>
    <ArticleList
      // view={ArticleView.BIG}
      articles={[]}
    />
  </div>
);

export default memo(ArticlesPage);
