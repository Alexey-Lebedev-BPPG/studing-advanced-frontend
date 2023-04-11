import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { articlesPageActions } from "../../model/slice/articlesPageSlice";
import cls from "./ArticlePageFilters.module.scss";
import {
  ArticleView,
  ArticleViewSelector,
  ArticleSortSelector,
  ArticleSortFields,
  ArticleTypeTabs,
  ArticleType,
} from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { SortOrder } from "@/shared/types";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";

export interface IArticlePageFiltersProps {
  className?: string;
}

export const ArticlePageFilters: FC<IArticlePageFiltersProps> = memo(
  ({ className }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const view = useSelector(getArticlesPageView);
    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
      dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debounceFetchData = useDebounce(fetchData);

    const onChangeView = useCallback(
      (newView: ArticleView) => {
        dispatch(articlesPageActions.setView(newView));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );
    const onChangeSort = useCallback(
      (newSort: ArticleSortFields) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );
    const onChangeOrder = useCallback(
      (newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );
    const onChangeSearch = useCallback(
      (newSearch: string) => {
        dispatch(articlesPageActions.setSearch(newSearch));
        dispatch(articlesPageActions.setPage(1));
        debounceFetchData();
      },
      [dispatch, debounceFetchData]
    );
    const onChangeType = useCallback(
      (value: ArticleType) => {
        dispatch(articlesPageActions.setType(value));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );

    return (
      <div className={classNames(cls.articlePageFilters, {}, [className])}>
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
            order={order}
            sort={sort}
          />
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <Card className={cls.search}>
          <Input
            value={search}
            onChange={onChangeSearch}
            placeholder={t("Поиск")}
          />
        </Card>
        <ArticleTypeTabs
          selectedValue={type}
          onChangeType={onChangeType}
          className={cls.tabsWrapper}
        />
      </div>
    );
  }
);
