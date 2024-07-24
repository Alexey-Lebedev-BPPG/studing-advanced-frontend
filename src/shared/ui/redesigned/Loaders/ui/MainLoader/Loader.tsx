import { FC, memo } from 'react';
import cls from './Loader.module.scss';
import FullLogo from '@/shared/assets/icons/Info.svg';

interface ILoaderProps {
  text?: string;
}

export const Loader: FC<ILoaderProps> = memo(({ text }) => (
  <div className={cls.page}>
    <div className={cls.loader}>
      <div className={cls.content}>
        <FullLogo width='506' height='72' />
        <div className={cls.progress} />
        <p>{text}</p>
      </div>
    </div>
  </div>
));
