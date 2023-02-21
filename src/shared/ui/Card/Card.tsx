import { FC, HTMLAttributes, memo, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Card.module.scss";

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

const Card: FC<ICardProps> = memo(({ className, children, ...otherProps }) => (
  <div className={classNames(cls.card, {}, [className])} {...otherProps}>
    {children}
  </div>
));

export default Card;
