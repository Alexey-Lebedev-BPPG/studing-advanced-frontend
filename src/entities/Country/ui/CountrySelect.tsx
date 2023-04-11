import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Country } from "../model/consts/consts";
import { ListBox } from "@/shared/ui/Popups";

interface ICountryProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

// ввиду того, что массив всегда статичен, его не нужно оборачивать в memo
const options = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Ukraine, content: Country.Ukraine },
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
      <ListBox
        value={value}
        className={className}
        defaultValue={t("Укажите страну")}
        label={t("Укажите страну")}
        readonly={readonly}
        items={options}
        onChange={onChangeHandler}
        direction="top right"
      />
    );
  }
);
