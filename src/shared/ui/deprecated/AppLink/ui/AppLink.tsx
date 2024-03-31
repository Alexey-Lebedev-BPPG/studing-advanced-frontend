import { FC, ForwardedRef, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import cls from './AppLink.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type AppLinkTheme = 'primary' | 'secondary';

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
// не используем memo в компонентах, где у нас есть children
export const AppLink: FC<AppLinkProps> = forwardRef(
  (
    props,
    // добавляем реф, чтоб не было ошибки "Function components cannot be given refs..." в консоли
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const { children, className, theme = 'primary', to, ...otherProps } = props;

    return (
      <Link
        ref={ref}
        to={to}
        className={classNames(cls['app-link'], {}, [className, cls[theme]])}
        {...otherProps}
      >
        {children}
      </Link>
    );
  },
);
