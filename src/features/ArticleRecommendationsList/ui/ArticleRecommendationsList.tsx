import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { ArticleList } from "entities/Article";
import { Text, TextSize } from "shared/ui/Text/Text";
import { t } from "i18next";
import { VStack } from "shared/ui/Stack";
import { useArticleRecommendationsList } from "../api/articleRecommendationApi";

export interface IArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList: FC<IArticleRecommendationsListProps> =
  memo(({ className }) => {
    // передаем в хук наш лимит и получаем поля по умолчанию (data, isLoading, error и т.д)
    const {
      data: recommendations,
      isLoading,
      error,
    } = useArticleRecommendationsList(3);

    if (isLoading || error) return null;

    return (
      <VStack gap="8" className={classNames("", {}, [className])}>
        <Text size={TextSize.L} title={t("Рекомендуем")} />
        <ArticleList
          target="_blank"
          articles={recommendations}
          isLoading={isLoading}
        />
      </VStack>
    );
  });
