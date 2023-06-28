import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './ArticleDetails.module.scss';
import { ArticleBlockType } from '../../model/consts/consts';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface IArticleDetailsProps {
  className?: string;
  id?: string;
}

// чтоб напрямую не передавать в пропсы объект такого типа reducers={{ loginForm: loginReducer }}, т.к. это каждый раз будет создавать новый объект, мы делаем редьюсер по ум.
const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<IArticleDetailsProps> = memo(
  ({ className, id }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    const renderBlock = useCallback((block: ArticleBlock) => {
      if (block.type === ArticleBlockType.CODE)
        return (
          <ArticleCodeBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      if (block.type === ArticleBlockType.IMAGE)
        return (
          <ArticleImageBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      if (block.type === ArticleBlockType.TEXT)
        return (
          <ArticleTextBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      return null;
    }, []);

    useInitialEffect(() => {
      dispatch(fetchArticleById(id));
    });

    let content;

    if (isLoading)
      content = (
        <>
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
        </>
      );
    else if (error)
      content = (
        <Text
          title={`${t('Произошла ошибка при загрузке статьи.')}`}
          align={TextAlign.CENTER}
        />
      );
    else
      content = (
        <>
          <HStack max justify='center' className={cls.avatarWrapper}>
            <Avatar size={200} src={article?.img} className={cls.avatar} />
          </HStack>
          <VStack gap='4' data-testid='ArticleDetails.Info'>
            <Text
              title={article?.title}
              text={article?.subtitle}
              className={cls.title}
              size={TextSize.L}
            />
            <HStack gap='8' className={cls.articleInfo}>
              <Icon Svg={EyeIcon} className={cls.icon} />
              <Text title={String(article?.views)} />
            </HStack>
            <HStack gap='8' className={cls.articleInfo}>
              <Icon Svg={CalendarIcon} className={cls.icon} />
              <Text title={article?.createdAt} />
            </HStack>
          </VStack>
          {article?.blocks.map(renderBlock)}
        </>
      );

    return (
      // обертка для использования асинхронных редьюсеров в асинхронных компонентах
      <DynamicModuleLoader reducers={reducers}>
        <VStack
          max
          gap='16'
          className={classNames(cls.articleDetails, {}, [className])}
        >
          {content}
        </VStack>
      </DynamicModuleLoader>
    );
  },
);
