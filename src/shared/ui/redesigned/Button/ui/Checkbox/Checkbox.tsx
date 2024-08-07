import { InputHTMLAttributes, memo, ReactNode } from 'react';
import cls from './Checkbox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'onChange' | 'size'
>;

export interface CheckboxProps extends HTMLInputProps {
  checked?: boolean;
  children?: string | ReactNode;
  className?: string;
  error?: boolean;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'default' | 'small';
}

export const Checkbox = memo((props: CheckboxProps) => {
  const {
    checked,
    children,
    className,
    error = false,
    id,
    onChange,
    size = 'default',
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className={classNames(cls.checkbox, {}, [className, cls[size]])}>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        aria-invalid={error}
        onChange={onChangeHandler}
        {...otherProps}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
});
