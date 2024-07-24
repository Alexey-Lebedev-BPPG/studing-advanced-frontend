import { InputHTMLAttributes, memo } from 'react';
import cls from './RadioButton.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'onChange' | 'readOnly'
>;
export interface RadioButtonProps extends HTMLInputProps {
  checked: boolean;
  className?: string;
  id?: string;
  name?: string;
  onChange: (value: boolean) => void;
  text?: string;
  value?: string;
}
export const RadioButton = memo((props: RadioButtonProps) => {
  const { checked, className, id, name, onChange, text, value, ...otherProps } =
    props;

  return (
    <div className={classNames(cls['radio-button'], {}, [className])}>
      <label htmlFor={id} className={cls['radio-label']}>
        <input
          className={cls['radio-input']}
          type='radio'
          name={name}
          id={id}
          checked={checked}
          onChange={event => onChange(event.target.checked)}
          {...otherProps}
        />
        <span className={cls['custom-radio']} />
      </label>
    </div>
  );
});
