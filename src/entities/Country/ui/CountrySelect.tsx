import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Country } from '../model/consts/consts';
import { ListBox } from '@/shared/ui/Popups';

interface ICountryProps {
  className?: string;
  onChange?: (value: Country) => void;
  readonly?: boolean;
  value?: Country;
}

// ввиду того, что массив всегда статичен, его не нужно оборачивать в memo
const options = [
  { content: Country.Armenia, value: Country.Armenia },
  { content: Country.Russia, value: Country.Russia },
  { content: Country.Belarus, value: Country.Belarus },
  { content: Country.Kazakhstan, value: Country.Kazakhstan },
  { content: Country.Ukraine, value: Country.Ukraine },
];

export const CountrySelect: FC<ICountryProps> = memo(
  ({ className, onChange, readonly, value }) => {
    const { t } = useTranslation();

    // явно преобразовываем значения из onChange в наш тип
    const onChangeHandler = useCallback(
      (valueOpt: string) => {
        onChange?.(valueOpt as Country);
      },
      [onChange],
    );

    return (
      <ListBox
        value={value}
        className={className}
        defaultValue={`${t('Укажите страну')}`}
        label={`${t('Укажите страну')}`}
        readonly={readonly}
        items={options}
        direction='top right'
        onChange={onChangeHandler}
      />
    );
  },
);
