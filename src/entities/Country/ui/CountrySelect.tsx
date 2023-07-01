import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Country } from '../model/consts/consts';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface ICountryProps {
  className?: string;
  onChange?: (value: Country) => void;
  readonly?: boolean;
  value?: Country;
}

// ввиду того, что массив всегда статичен, его не нужно оборачивать в memo
const options = [
  { content: Country.Armenia, valueOpt: Country.Armenia },
  { content: Country.Russia, valueOpt: Country.Russia },
  { content: Country.Belarus, valueOpt: Country.Belarus },
  { content: Country.Kazakhstan, valueOpt: Country.Kazakhstan },
  { content: Country.Ukraine, valueOpt: Country.Ukraine },
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

    const childrenProps = {
      className,
      defaultValue: `${t('Укажите страну')}`,
      direction: 'top right' as const,
      items: options,
      label: `${t('Укажите страну')}`,
      onChange: onChangeHandler,
      readonly,
      value,
    };

    return (
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={<ListBoxDeprecated {...childrenProps} />}
        on={<ListBox {...childrenProps} />}
      />
    );
  },
);
