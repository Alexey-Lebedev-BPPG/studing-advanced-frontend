import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  ERROR = "error",
}

export enum TextAlign {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}

interface ITextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}

export const Text: FC<ITextProps> = memo(
  ({
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
  }) => {
    const mods = {
      [cls[theme]]: true,
      [cls[align]]: true,
    };

    return (
      <div className={classNames(cls.textWrapper, mods, [className])}>
        {title && <div className={cls.title}>{title}</div>}
        {text && <div className={cls.text}>{text}</div>}
      </div>
    );
  }
);
