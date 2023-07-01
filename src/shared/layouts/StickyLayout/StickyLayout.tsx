import { FC, ReactElement, memo } from 'react';
import cls from './stickyLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface IStickyLayoutProps {
  className?: string;
  content: ReactElement;
  left?: ReactElement;
  right?: ReactElement;
}

export const StickyLayout: FC<IStickyLayoutProps> = memo(props => {
  const { className, content, left, right } = props;

  return (
    <div className={classNames(cls.stickyLayout, {}, [className])}>
      {!!right && <div className={cls.left}>{left}</div>}
      <div className={cls.content}>{content}</div>
      {!!left && <div className={cls.right}>{right}</div>}
    </div>
  );
});