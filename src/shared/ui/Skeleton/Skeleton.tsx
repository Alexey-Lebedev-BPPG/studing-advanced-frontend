import { CSSProperties, FC, memo } from 'react';
import cls from './Skeleton.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ISkeletonProps {
  border?: string;
  className?: string;
  height?: string | number;
  width?: string | number;
}

export const Skeleton: FC<ISkeletonProps> = memo(
  ({ border, className, height, width }) => {
    const styles: CSSProperties = {
      borderRadius: border,
      height,
      width,
    };

    return (
      <div className={classNames(cls.skeleton, {}, [className])} style={styles}>
        <div />
      </div>
    );
  },
);
