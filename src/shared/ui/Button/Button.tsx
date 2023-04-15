import { ButtonHTMLAttributes, FC, ReactNode, memo } from 'react';
import cls from './Button.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  /**
   * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
   */
  theme?: ButtonTheme;
  /**
   * Флаг, делающий кнопку квадратной
   */
  square?: boolean;
  /**
   * Размер кнопки в соответствии с дизайн системой
   */
  size?: ButtonSize;
  /**
   * Флаг, отвечающий за работу кнопки
   */
  disabled?: boolean;
  /**
   * Содержимое кнопки
   */
  children?: ReactNode;
  /**
   * Увеличивает кнопку на всю свободную ширину
   */
  fullWidth?: boolean;
}

// обернем кнопку тоже в memo, хоть она и принимает чилдрены, но они будут в виде простого примитива без сложной древовидной структуры
export const Button: FC<IButtonProps> = memo(
  ({
    className,
    children,
    theme = ButtonTheme.OUTLINE,
    square,
    size = ButtonSize.M,
    fullWidth,
    disabled,
    ...otherProps
  }) => {
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
  },
);
