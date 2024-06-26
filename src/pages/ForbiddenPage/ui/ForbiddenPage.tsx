import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ForbiddenPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

export interface IForbiddenPageProps {
  className?: string;
}

const ForbiddenPage: FC<IForbiddenPageProps> = memo(({ className }) => {
  const { t } = useTranslation();

  return (
    <Page
      data-testid='ForbiddenPage'
      className={classNames(cls['forbidden-page'], {}, [className])}
    >
      {t('У Вас нет доступа на эту страницу')}
    </Page>
  );
});

export default ForbiddenPage;
