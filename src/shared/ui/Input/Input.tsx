import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  memo,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import cls from "./Input.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly"
>;

interface IInputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
}
// memo позволяет избежать лишних перерисовок
export const Input: FC<IInputProps> = memo((props) => {
  const {
    className,
    value,
    onChange,
    type = "text",
    placeholder,
    autofocus,
    readonly,
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  const isCaretVisible = isFocused && !readonly;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // вызываем функцию только тогда, когда она была передана
    onChange?.(event.target.value);
    setCaretPosition(event.target.value.length);
  };

  const onBlurHandler = () => setIsFocused(false);
  const onFocusHandler = () => setIsFocused(true);
  // функция, которая срабатывает в выделенном месте
  const onSelectHandler = (event: SyntheticEvent<HTMLDivElement, Event>) => {
    if (event.target instanceof HTMLInputElement) {
      setCaretPosition(event.target.selectionStart || 0);
    }
  };

  const mods = {
    [cls.readonly]: readonly,
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
      {placeholder && (
        <div className={cls.placeholder}>{`${placeholder}>`}</div>
      )}
      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.input}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onSelect={onSelectHandler}
          readOnly={readonly}
          {...otherProps}
        />
        {isCaretVisible && (
          <span
            className={cls.caret}
            style={{ left: `${caretPosition * 9}px` }}
          />
        )}
      </div>
    </div>
  );
});
