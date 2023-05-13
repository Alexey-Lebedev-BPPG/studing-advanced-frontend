import { t } from 'i18next';
import { FC, memo } from 'react';
import { useArticleRecommendationsList } from '../api/articleRecommendationApi';
import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';

export interface IArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList: FC<IArticleRecommendationsListProps> =
  memo(({ className }) => {
    // передаем в хук наш лимит и получаем поля по умолчанию (data, isLoading, error и т.д)
    const {
      data: recommendations,
      error,
      isLoading,
    } = useArticleRecommendationsList(3);

    if (isLoading || error || !recommendations) return null;

    return (
      <VStack
        data-testid='ArticleRecommendationsList'
        gap='8'
        className={classNames('', {}, [className])}
      >
        <Text size={TextSize.L} title={`${t('Рекомендуем')}`} />
        <ArticleList
          target='_blank'
          articles={recommendations}
          isLoading={isLoading}
          virtualized={false}
        />
      </VStack>
    );
  });
