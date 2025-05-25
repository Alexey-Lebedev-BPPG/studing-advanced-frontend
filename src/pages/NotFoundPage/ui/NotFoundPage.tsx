import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import cls from './notFoundPage.module.css';
import { getRouteMain } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';

interface INotFoundPageProps {
  className?: string;
}

export const NotFoundPage: FC<INotFoundPageProps> = props => {
  const { className } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const backToHome = () => navigate(getRouteMain());

  return (
    <div
      data-testid='NotFoundPage'
      className={classNames(cls['not-found-page'], {}, [className])}
    >
      <div className={cls.content}>
        <h1>{'404'}</h1>
        <h2>{t('Страница не найдена')}</h2>
        <p>{'I tried to catch some fog, but i miss'}</p>
        <Button onClick={backToHome}>{t('Вернуться на главную')}</Button>
      </div>
      <img
        src='https://codetheworld.io/wp-content/uploads/2024/02/bg-scaled.jpg'
        alt=''
      />
    </div>
  );
};
