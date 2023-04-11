import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { ArticleList } from "@/entities/Article";
import { Text } from "@/shared/ui/Text";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { getArticles } from "../../model/slice/articlesPageSlice";

export interface IArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList: FC<IArticleInfiniteListProps> = memo(
  ({ className }) => {
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);

    if (error) return <Text text="Ошибка при загрузке статей" />;

    return (
      <ArticleList
        isLoading={isLoading}
        view={view}
        articles={articles}
        className={className}
      />
    );
  }
);
