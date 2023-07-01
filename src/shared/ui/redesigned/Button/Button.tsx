import { ButtonHTMLAttributes, FC, ReactNode, memo } from 'react';
import cls from './Button.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type ButtonVariant = 'clear' | 'outline' | 'filled';

type ButtonSize = 'm' | 'l' | 'xl';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
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
  variant?: ButtonVariant;
}

// не используем memo в компонентах, где у нас есть children
// обернем кнопку тоже в memo, хоть она и принимает чилдрены, но они будут в виде простого примитива без сложной древовидной структуры
export const Button: FC<IButtonProps> = memo(props => {
  const {
    addonLeft,
    addonRight,
    children,
    className,
    disabled,
    fullWidth,
    size = 'm',
    square,
    variant = 'outline',
    ...otherProps
  } = props;

  const mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
    [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
  };

  return (
    <button
      type='button'
      className={classNames(cls.button, mods, [
        className,
        cls[variant],
        cls[size],
      ])}
      {...otherProps}
    >
      {!!addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
      {children}
      {!!addonRight && <div className={cls.addonRight}>{addonRight}</div>}
    </button>
  );
});
