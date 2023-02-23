import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";

export interface IArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  // отображение (плитка или список)
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const ArticleList: FC<IArticleListProps> = memo(
  ({ className, articles, isLoading, view = ArticleView.SMALL }) => {
    const { t } = useTranslation();
    const renderArticle = (article: Article) => (
      <ArticleListItem
        article={article}
        view={view}
        key={article.id}
        className={cls.card}
      />
    );

    if (!isLoading && !articles.length)
      return (
        <div className={classNames("", {}, [className, cls[view]])}>
          <Text size={TextSize.L} title={t("Статьи не найдены")} />
        </div>
      );

    return (
      <div className={classNames("", {}, [className, cls[view]])}>
        {articles.length > 0
          ? articles.map((article) => renderArticle(article))
          : null}
        {isLoading && getSkeletons(view)}
      </div>
    );
  }
);
