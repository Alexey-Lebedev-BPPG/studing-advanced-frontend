import { FC, memo } from "react";
import { useParams } from "react-router-dom";
import { ArticleDetails } from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Page } from "@/widgets/Page";
import { VStack } from "@/shared/ui/Stack";
import { ArticleRecommendationsList } from "@/features/ArticleRecommendationsList";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { articleDetailsPageReducer } from "../../model/slice";
import cls from "./ArticleDetailsPage.module.scss";
import ArticleDetailsComments from "../ArticleDetailsComments/ArticleDetailsComments";
import { ArticleRating } from "@/features/ArticleRating";

interface IArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<IArticleDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <ArticleRating articleId={id} />
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
