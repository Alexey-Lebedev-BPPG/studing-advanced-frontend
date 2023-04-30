import { FC, HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINE = 'outline',
}

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  fullWidth?: boolean;
}

export const Card: FC<ICardProps> = ({
  className,
  children,
  theme = CardTheme.NORMAL,
  fullWidth,
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
