import { FC, memo, SVGProps, VFC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Icon.module.scss";

interface IIconProps {
  className?: string;
  // принимаем ссылку на свг
  Svg: VFC<SVGProps<SVGSVGElement>>;
}

// обертка для свг, которая будет задавать цвета
export const Icon: FC<IIconProps> = memo(({ className, Svg }) => (
  <Svg className={classNames(cls.icon, {}, [className])} />
));
