import { FC } from 'react';
import cls from './PageLoader.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader';

interface IPageLoaderProps {
  className?: string;
}

export const PageLoader: FC<IPageLoaderProps> = ({ className }) => (
  <div className={classNames(cls.pageLoader, {}, [className])}>
    <Loader />
  </div>
);
