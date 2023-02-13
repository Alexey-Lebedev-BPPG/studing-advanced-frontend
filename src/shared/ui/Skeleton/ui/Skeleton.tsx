import { CSSProperties, FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Skeleton.module.scss";

interface ISkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  border?: string;
}

export const Skeleton: FC<ISkeletonProps> = memo(
  ({ className, width, height, border }) => {
    const styles: CSSProperties = {
      width,
      height,
      borderRadius: border,
    };

    return (
      <div className={classNames(cls.skeleton, {}, [className])} style={styles}>
        <div />
      </div>
    );
  }
);
