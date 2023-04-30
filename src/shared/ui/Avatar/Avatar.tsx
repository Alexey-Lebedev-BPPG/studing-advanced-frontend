import { CSSProperties, FC, useMemo } from 'react';
import cls from './Avatar.module.scss';
import UserIcon from '../../assets/icons/user-filled.svg';
import { AppImage } from '../AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IAvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  // для использования в компонентах, где инвертированы цвета
  fallbackInverted?: boolean;
}

export const Avatar: FC<IAvatarProps> = ({
  className,
  src,
  size = 100,
  alt = '',
  fallbackInverted,
}) => {
  const styles = useMemo<CSSProperties>(
    () => ({
      height: size,
      width: size,
    }),
    [size],
  );
  const fallback = <Skeleton width={size} height={size} border='50%' />;
  const errorFallback = (
    <Icon
      inverted={fallbackInverted}
      width={size}
      height={size}
      Svg={UserIcon}
    />
  );

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      style={styles}
      className={classNames(cls.avatar, {}, [className])}
      alt={alt}
    />
  );
};
