import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  ReactNode,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import cls from './Input.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface IInputProps extends HTMLInputProps {
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  autofocus?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  value?: string | number;
}

export const Input: FC<IInputProps> = memo(props => {
  const {
    addonLeft,
    addonRight,
    autofocus,
    className,
    onChange,
    placeholder,
    readonly,
    type = 'text',
    value,
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // вызываем функцию только тогда, когда она была передана
    onChange?.(event.target.value);
  };

  const onBlurHandler = () => setIsFocused(false);
  const onFocusHandler = () => setIsFocused(true);

  const mods = {
    [cls.readonly]: readonly,
    [cls.focused]: isFocused,
    [cls.withAddonLeft]: Boolean(addonLeft),
    [cls.withAddonRight]: Boolean(addonRight),
  };

  // делаем автофокус при открытии
  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
    return () => setIsFocused(false);
  }, [autofocus]);
  return (
    <div className={classNames(cls.inputWrapper, mods, [className])}>
      {!!addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
      <input
        ref={ref}
        type={type}
        value={value}
        className={cls.input}
        readOnly={readonly}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        {...otherProps}
      />
      {!!addonRight && <div className={cls.addonRight}>{addonRight}</div>}
    </div>
  );
});
