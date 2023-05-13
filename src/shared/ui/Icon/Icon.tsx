import { FC, memo, SVGProps, VFC } from 'react';
import cls from './Icon.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IIconProps extends SVGProps<SVGSVGElement> {
  // принимаем ссылку на свг
  Svg: VFC<SVGProps<SVGSVGElement>>;
  className?: string;
  inverted?: boolean;
}

// обертка для свг, которая будет задавать цвета
export const Icon: FC<IIconProps> = memo(
  ({ className, inverted, Svg, ...otherProps }) => (
    <Svg
      className={classNames(inverted ? cls.inverted : cls.icon, {}, [
        className,
      ])}
      {...otherProps}
    />
  ),
);
