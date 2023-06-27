import { ChangeEvent, memo, useMemo } from 'react';
import cls from './Select.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface SelectOption<T extends string> {
  // отображение опции
  content: string;
  // значение опции
  valueOpt: T;
}

interface ISelectProps<T extends string> {
  className?: string;
  label?: string;
  onChange?: (value: T) => void;
  options?: SelectOption<T>[];
  readonly?: boolean;
  // выбранное значение
  value?: T;
}
// делаем обертку для того, чтоб принимать дженериком тип для пропсов в компоненте, который использует мемо
const typedMemo: <T>(c: T) => T = memo;

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Select = typedMemo(
  <T extends string>({
    className,
    label,
    onChange,
    options,
    readonly,
    value,
  }: ISelectProps<T>) => {
    const mods = {};

    const optionList = useMemo(
      () =>
        options?.map(({ content, valueOpt }) => (
          <option key={valueOpt} className={cls.option} value={valueOpt}>
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
        {label ? <span className={cls.label}>{`${label}>`}</span> : null}
        <select
          className={cls.select}
          value={value}
          disabled={readonly}
          onChange={onChangeHandler}
        >
          {optionList}
        </select>
      </div>
    );
  },
);
