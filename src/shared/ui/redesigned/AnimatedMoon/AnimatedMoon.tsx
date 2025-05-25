import { FC, memo } from 'react';
import cls from './animatedMoon.module.css';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IAnimatedMoonProps {
  className?: string;
}

export const AnimatedMoon: FC<IAnimatedMoonProps> = memo(props => {
  const { className } = props;

  return (
    <div className={classNames(cls['animated-moon'], {}, [className])}>
      <div className={cls.light} />
      <div className={cls.texture} />
      <div className={cls.sphere} />
    </div>
  );
});
