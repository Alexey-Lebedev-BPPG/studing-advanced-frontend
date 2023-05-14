import { ButtonHTMLAttributes, FC, ReactNode, memo } from 'react';
import cls from './Button.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export enum ButtonTheme {
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
}

export enum ButtonSize {
  L = 'size_l',
  M = 'size_m',
  XL = 'size_xl',
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Содержимое кнопки
   */
  children?: ReactNode;
  className?: string;
  /**
   * Флаг, отвечающий за работу кнопки
   */
  disabled?: boolean;
  /**
   * Увеличивает кнопку на всю свободную ширину
   */
  fullWidth?: boolean;
  /**
   * Размер кнопки в соответствии с дизайн системой
   */
  size?: ButtonSize;
  /**
   * Флаг, делающий кнопку квадратной
   */
  square?: boolean;
  /**
   * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
   */
  theme?: ButtonTheme;
}

// не используем memo в компонентах, где у нас есть children
// обернем кнопку тоже в memo, хоть она и принимает чилдрены, но они будут в виде простого примитива без сложной древовидной структуры
export const Button: FC<IButtonProps> = memo(props => {
  const {
    children,
    className,
    disabled,
    fullWidth,
    size = ButtonSize.M,
    square,
    theme = ButtonTheme.OUTLINE,
    ...otherProps
  } = props;

  const mods = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  };
  return (
    <button
      type='button'
      className={classNames(cls.button, mods, [className])}
      {...otherProps}
    >
      {children}
    </button>
  );
});
