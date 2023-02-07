import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Select } from "shared/ui/Select/Select";
import { Country } from "../model/types/country";
import cls from "./CountrySelect.module.scss";

interface ICountryProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

// ввиду того, что массив всегда статичен, его не нужно оборачивать в memo
const options = [
  { valueOpt: Country.Armenia, content: Country.Armenia },
  { valueOpt: Country.Russia, content: Country.Russia },
  { valueOpt: Country.Belarus, content: Country.Belarus },
  { valueOpt: Country.Kazakhstan, content: Country.Kazakhstan },
  { valueOpt: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect: FC<ICountryProps> = memo(
  ({ className, value, onChange, readonly }) => {
    const { t } = useTranslation();

    // явно преобразовываем значения из onChange в наш тип
    const onChangeHandler = useCallback(
      (valueOpt: string) => {
        onChange?.(valueOpt as Country);
      },
      [onChange]
    );

    return (
      <Select
        className={classNames(cls.countrySelect, {}, [className])}
        label={t("Укажите страну")}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    );
  }
);
