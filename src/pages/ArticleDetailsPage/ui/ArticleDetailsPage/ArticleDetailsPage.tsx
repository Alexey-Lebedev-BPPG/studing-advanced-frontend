import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slice';
import ArticleDetailsComments from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetails } from '@/entities/Article';
import { Counter } from '@/entities/Counter';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getFeatureFlags } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

interface IArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<IArticleDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();
  // добавление фичи-флага (данные, кому показывать, а кому нет, должны храниться в БД (например, в модели юзера))
  // в нашем случае мы добавили пользователю с id=1 этот фичи-флаг и второму пользователю отключили
  const isArticleRatingEnable = getFeatureFlags('isArticleRatingEnabled');
  const isCounterEnable = getFeatureFlags('isCounterEnabled');

  if (!id) return null;

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
        <VStack max gap='16'>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          {/* пример применения функционала по фичи-флагу */}
          {/* {!!isArticleRatingEnable && <ArticleRating articleId={id} />} */}
          {!!isCounterEnable && <Counter />}
          <ArticleRating articleId={id} />
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
