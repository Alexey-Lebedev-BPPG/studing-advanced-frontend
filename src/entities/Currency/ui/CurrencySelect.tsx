import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Select } from "shared/ui/Select/Select";
import { Currency } from "../model/types/currency";
import cls from "./Currency.module.scss";

interface ICurrencyProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

// ввиду того, что массив всегда статичен, его не нужно оборачивать в memo
const options = [
  { valueOpt: Currency.RUB, content: Currency.RUB },
  { valueOpt: Currency.EUR, content: Currency.EUR },
  { valueOpt: Currency.USD, content: Currency.USD },
];

export const CurrencySelect: FC<ICurrencyProps> = memo(
  ({ className, value, onChange, readonly }) => {
    const { t } = useTranslation();

    // явно преобразовываем значения из onChange в наш тип
    const onChangeHandler = useCallback(
      (valueOpt: string) => {
        onChange?.(valueOpt as Currency);
      },
      [onChange]
    );

    return (
      <Select
        className={classNames(cls.currencySelect, {}, [className])}
        label={t("Укажите валюту")}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    );
  }
);
