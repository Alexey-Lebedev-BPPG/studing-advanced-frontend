import { FC, HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type CardTheme = 'normal' | 'outline';
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  theme?: CardTheme;
}

export const Card: FC<ICardProps> = ({
  children,
  className,
  fullWidth,
  theme = 'normal',
  ...otherProps
}) => (
  <div
    className={classNames(cls.card, { [cls.fullWidth]: fullWidth }, [
      className,
      cls[theme],
    ])}
    {...otherProps}
  >
    {children}
  </div>
);
