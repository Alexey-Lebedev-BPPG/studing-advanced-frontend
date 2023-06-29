import { CSSProperties, FC, useMemo } from 'react';
import cls from './Avatar.module.scss';
import UserIcon from '../../../assets/icons/user-filled.svg';
import { AppImage } from '../../redesigned/AppImage';
import { Skeleton } from '../../redesigned/Skeleton';
import { Icon } from '../Icon';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IAvatarProps {
  alt?: string;
  className?: string;
  // для использования в компонентах, где инвертированы цвета
  fallbackInverted?: boolean;
  size?: number;
  src?: string;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Avatar: FC<IAvatarProps> = ({
  alt = '',
  className,
  fallbackInverted,
  size = 100,
  src,
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
