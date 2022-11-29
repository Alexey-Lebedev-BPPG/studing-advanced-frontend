import { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ThemeButton {
  // eslint-disable-next-line no-unused-vars
  CLEAR = "clear",
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: FC<IButtonProps> = ({
  className,
  children,
  theme,
  ...otherProps
}) => (
  <button
    type="button"
    className={classNames(cls.button, {}, [className, cls[theme]])}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...otherProps}
  >
    {children}
  </button>
);
