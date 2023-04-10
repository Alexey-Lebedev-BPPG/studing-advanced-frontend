import { FC, memo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Page } from "@/widgets/Page";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { fetchNextArticlePage } from "../../model/services/fetchNextArticlePage/fetchNextArticlePage";
import { articlesPageReducer } from "../../model/slice/articlesPageSlice";
import cls from "./ArticlesPage.module.scss";
import { ArticlePageFilters } from "../ArticlePageFilters/ArticlePageFilters";
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList";

interface IArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<IArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlePage());
  }, [dispatch]);

  useInitialEffect(() => {
    // достаем параметры из урл и прокидываем в сброс
    dispatch(initArticlesPage(searchParams));
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.articlesPage, {}, [className])}
      >
        <ArticlePageFilters />
        <ArticleInfiniteList className={cls.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
