import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import cls from './ArticleEditPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

export interface IArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: FC<IArticleEditPageProps> = memo(props => {
  const { className } = props;

  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  // если есть id, то страница для редактирования
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls['article-edit-page'], {}, [className])}>
      {isEdit
        ? t('Редактирование статьи с ID = ') + id
        : t('Создание новой статьи')}
    </Page>
  );
});

export default ArticleEditPage;
