import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  ERROR = "error",
}

interface ITextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
}

export const Text: FC<ITextProps> = ({
  className,
  title,
  text,
  theme = TextTheme.PRIMARY,
}) => (
  <div
    className={classNames(cls.textWrapper, { [cls[theme]]: true }, [className])}
  >
    {title && <div className={cls.title}>{title}</div>}
    {text && <div className={cls.text}>{text}</div>}
  </div>
);
