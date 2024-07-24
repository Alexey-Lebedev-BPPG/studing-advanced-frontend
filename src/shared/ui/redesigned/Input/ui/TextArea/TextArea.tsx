import {
  ChangeEvent,
  FC,
  TextareaHTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { VStack } from '../../../Stack';
import cls from '../../model/styles/inputStyles.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type HTMLTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange'
>;

interface ITextAreaProps extends HTMLTextareaProps {
  autofocus?: boolean;
  className?: string;
  fullWidth?: boolean;
  label?: string;
  onChange?: (value: string) => void;
  sizeRows?: number;
  value?: string | number;
}

export const TextArea: FC<ITextAreaProps> = memo(props => {
  const {
    autofocus,
    className,
    fullWidth = true,
    label,
    onChange,
    sizeRows = 4,
    value,
    ...otherProps
  } = props;
  const ref = useRef<HTMLTextAreaElement>(null);

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event.target.value);
    },
    [onChange],
  );

  useEffect(() => {
    if (autofocus) ref.current?.focus();
  }, [autofocus]);

  const modsWrapper = {
    [cls.fullWidth]: fullWidth,
  };

  const modsArea = {
    [cls.fullWidth]: fullWidth,
  };

  return (
    <VStack gap='8' className={classNames('', modsWrapper, [])}>
      {!!label && (
        <label htmlFor='textarea' className={cls.label}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id='textarea'
        rows={sizeRows}
        className={classNames(cls.input, modsArea, [className])}
        value={value}
        onChange={onChangeHandler}
        {...otherProps}
      />
    </VStack>
  );
});
