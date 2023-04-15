import { ChangeEvent, memo, useMemo } from 'react';
import cls from './Select.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface SelectOption<T extends string> {
  // значение опции
  valueOpt: T;
  // отображение опции
  content: string;
}

interface ISelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  // выбранное значение
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}
// делаем обертку для того, чтоб принимать дженериком тип для пропсов в компоненте, который использует мемо
const typedMemo: <T>(c: T) => T = memo;

export const Select = typedMemo(
  <T extends string>({
    className,
    label,
    options,
    value,
    onChange,
    readonly,
  }: ISelectProps<T>) => {
    const mods = {};

    const optionList = useMemo(
      () =>
        options?.map(({ valueOpt, content }) => (
          <option className={cls.option} value={valueOpt} key={valueOpt}>
            {content}
          </option>
        )),
      [options],
    );

    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event.target.value as T);
    };

    return (
      <div className={classNames(cls.selectWrapper, mods, [className])}>
        {label && <span className={cls.label}>{`${label}>`}</span>}
        <select
          className={cls.select}
          value={value}
          onChange={onChangeHandler}
          disabled={readonly}
        >
          {optionList}
        </select>
      </div>
    );
  },
);
