import { FC, ForwardedRef, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import cls from './AppLink.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = forwardRef(
  (
    { children, className, theme = AppLinkTheme.PRIMARY, to, ...otherProps },
    // добавляем реф, чтоб не было ошибки "Function components cannot be given refs..." в консоли
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <Link
      ref={ref}
      to={to}
      className={classNames(cls.appLink, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  ),
);
