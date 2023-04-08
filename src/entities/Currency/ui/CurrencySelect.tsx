import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "shared/ui/ListBox/ListBox";
import { Currency } from "../model/consts/consts";

interface ICurrencyProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

// ввиду того, что массив всегда статичен, его не нужно оборачивать в memo
const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
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
      <ListBox
        value={value}
        className={className}
        defaultValue={t("Укажите валюту")}
        label={t("Укажите валюту")}
        readonly={readonly}
        items={options}
        onChange={onChangeHandler}
        direction="top right"
      />
    );
  }
);
