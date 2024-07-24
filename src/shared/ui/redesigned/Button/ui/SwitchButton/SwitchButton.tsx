import { ChangeEvent, FC, InputHTMLAttributes, memo } from 'react';
import cls from './Switch.module.scss';
import { HStack } from '../../../Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'size'
>;

interface ISwitchProps extends HTMLInputProps {
  disabled?: boolean;
  setValue: (value: boolean) => void;
  size?: 'default' | 'small';
  text?: string;
  titleClass?: string;
  value: boolean;
}

export const SwitchButton: FC<ISwitchProps> = memo(props => {
  const {
    disabled = false,
    id,
    onChange,
    setValue,
    size = 'default',
    text,
    titleClass,
    value,
    ...otherProps
  } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    setValue(event.target.checked);
  };

  return (
    <HStack gap='16' align='center' className={classNames('', {}, [cls[size]])}>
      <label htmlFor={`switch-button-${id}`} className={cls.switch}>
        <input
          disabled={disabled}
          checked={value}
          id={`switch-button-${id}`}
          type='checkbox'
          onChange={handleChange}
          {...otherProps}
        />
        <span className={classNames(cls.slider, {}, [cls.round])} />
      </label>
      {!!text && (
        <span className={classNames(cls.title, {}, [titleClass])}>{text}</span>
      )}
    </HStack>
  );
});
