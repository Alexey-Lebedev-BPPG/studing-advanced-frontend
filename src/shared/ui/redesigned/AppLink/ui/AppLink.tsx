import { FC, ForwardedRef, forwardRef } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import cls from './AppLink.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export type AppLinkVariant = 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
  activeClassName?: string;
  className?: string;
  // variant?: AppLinkVariant;
}

// не используем memo в компонентах, где у нас есть children
export const AppLink: FC<AppLinkProps> = forwardRef(
  (
    props,
    // добавляем реф, чтоб не было ошибки "Function components cannot be given refs..." в консоли
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const {
      activeClassName = '',
      children,
      className,
      to,
      // variant = 'primary',
      ...otherProps
    } = props;

    return (
      // навлинк позволяет отслеживать активную ссылку
      <NavLink
        ref={ref}
        to={to}
        className={({ isActive }) =>
          classNames(cls.appLink, { [activeClassName]: isActive }, [
            className,
            // cls[variant],
          ])
        }
        {...otherProps}
      >
        {children}
      </NavLink>
    );
  },
);
