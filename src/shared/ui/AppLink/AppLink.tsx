import { FC, ForwardedRef, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import cls from './AppLink.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  theme?: AppLinkTheme;
  className?: string;
}

export const AppLink: FC<AppLinkProps> = forwardRef(
  (
    { to, className, theme = AppLinkTheme.PRIMARY, children, ...otherProps },
    // добавляем реф, чтоб не было ошибки "Function components cannot be given refs..." в консоли
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <Link
      to={to}
      ref={ref}
      className={classNames(cls.appLink, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  ),
);
