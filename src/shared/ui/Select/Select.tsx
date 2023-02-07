import { ChangeEvent, FC, memo, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Select.module.scss";

export interface SelectOption {
  // значение опции
  valueOpt: string;
  // отображение опции
  content: string;
}

interface ISelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  // выбранное значение
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select: FC<ISelectProps> = memo(
  ({ className, label, options, value, onChange, readonly }) => {
    const mods = {};

    const optionList = useMemo(
      () =>
        options?.map(({ valueOpt, content }) => (
          <option className={cls.option} value={valueOpt} key={valueOpt}>
            {content}
          </option>
        )),
      [options]
    );

    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event.target.value);
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
  }
);
