import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../../model/selectors/articleDetails';
import cls from '../ArticleDetails.module.scss';
import { renderArticleBlock } from '../renderBlock';
import { useAppSelector } from '@/shared/lib/hooks/redux';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const RedesignedContent: FC = memo(props => {
  const isLoading = useAppSelector(getArticleDetailsIsLoading);
  const article = useAppSelector(getArticleDetailsData);
  const error = useAppSelector(getArticleDetailsError);
  const { t } = useTranslation();

  if (isLoading)
    return (
      <VStack max gap='16'>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border='50%'
        />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width='100%' height={200} />
        <Skeleton className={cls.skeleton} width='100%' height={200} />
      </VStack>
    );

  if (error)
    return (
      <Text
        variant='accent'
        title={`${t('Произошла ошибка при загрузке статьи.')}`}
        align='center'
      />
    );

  return (
    <>
      <Text bold variant='accent' title={article?.title} size='l' />
      <Text variant='accent' title={article?.subtitle} />
      <AppImage
        fallback={<Skeleton width='100%' height={420} border='16px' />}
        src={article?.img}
        className={cls.img}
      />
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
});
