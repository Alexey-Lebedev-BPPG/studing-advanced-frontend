import { CSSProperties, FC, useMemo } from "react";
import cls from "./Avatar.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";

interface IAvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar: FC<IAvatarProps> = ({
  className,
  src,
  size,
  alt = "",
}) => {
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size || 100,
      height: size || 100,
    }),
    [size]
  );

  return (
    <img
      src={src}
      style={styles}
      className={classNames(cls.avatar, {}, [className])}
      alt={alt}
    />
  );
};
