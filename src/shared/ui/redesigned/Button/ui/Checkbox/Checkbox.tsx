import { InputHTMLAttributes, memo, ReactNode } from 'react';
import cls from './Checkbox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'onChange'
>;

export interface CheckboxProps extends HTMLInputProps {
  checked?: boolean;
  children?: string | ReactNode;
  className?: string;
  error?: boolean;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = memo((props: CheckboxProps) => {
  const {
    checked,
    children,
    className,
    error = false,
    id,
    onChange,
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className={classNames(cls.checkbox, {}, [className])}>
      <input
        type='checkbox'
        id={`checkbox-${id}`}
        checked={checked}
        aria-invalid={error}
        onChange={onChangeHandler}
        {...otherProps}
      />
      <label htmlFor={`checkbox-${id}`}>{children}</label>
    </div>
  );
});
