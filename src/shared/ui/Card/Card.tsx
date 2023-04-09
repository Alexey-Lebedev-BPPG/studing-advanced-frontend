import { FC, HTMLAttributes, memo, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Card.module.scss";

export enum CardTheme {
  NORMAL = "normal",
  OUTLINE = "outline",
}

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  fullWidth?: boolean;
}

const Card: FC<ICardProps> = memo(
  ({
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
  )
);

export default Card;
