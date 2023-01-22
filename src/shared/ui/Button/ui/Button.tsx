import { ButtonHTMLAttributes, FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ButtonTheme {
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  OUTLINE = "outline",
  BACKGROUND = "background",
  BACKGROUND_INVERTED = "backgroundInverted",
}

export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  // пропс, чтоб кнопка была квадратной
  square?: boolean;
  // размеры кнопок
  size?: ButtonSize;
}

// обернем кнопку тоже в memo, хоть она и принимает чилдрены, но они будут в виде простого примитива без сложной древовидной структуры
export const Button: FC<IButtonProps> = memo(
  ({
    className,
    children,
    theme,
    square,
    size = ButtonSize.M,
    disabled,
    ...otherProps
  }) => {
    const mods: Record<string, boolean> = {
      [cls[theme]]: true,
      [cls.square]: square,
      // @ts-ignore
      [cls[size]]: true,
      [cls.disabled]: disabled,
    };
    return (
      <button
        type="button"
        className={classNames(cls.button, mods, [className])}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
);
