import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
  // eslint-disable-next-line no-unused-vars
  PRIMARY = "primary",
  // eslint-disable-next-line no-unused-vars
  SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
  theme?: AppLinkTheme;
  className?: string;
}

export const AppLink: FC<AppLinkProps> = ({
  to,
  className,
  theme = AppLinkTheme.PRIMARY,
  children,
  ...otherProps
}) => (
  <Link
    to={to}
    className={classNames(cls.appLink, {}, [className, cls[theme]])}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...otherProps}
  >
    {children}
  </Link>
);
