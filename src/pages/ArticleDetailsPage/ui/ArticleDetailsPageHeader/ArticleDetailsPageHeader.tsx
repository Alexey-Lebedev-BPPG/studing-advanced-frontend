import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getCanEditArticle } from '../../model/selectors/article';
import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';

export interface IArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<IArticleDetailsPageHeaderProps> =
  memo(props => {
    const { className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const article = useAppSelector(getArticleDetailsData);
    const canEdit = useAppSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);
    const onEditArticle = useCallback(() => {
      article && navigate(getRouteArticleEdit(article.id));
    }, [article, navigate]);

    return (
      <HStack max justify='between' className={classNames('', {}, [className])}>
        <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
        {!!canEdit && (
          <Button onClick={onEditArticle}>{t('Редактировать')}</Button>
        )}
      </HStack>
    );
  });
