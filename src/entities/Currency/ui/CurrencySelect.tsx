import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from '../model/consts/consts';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface ICurrencyProps {
  className?: string;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
  value?: Currency;
}

// ввиду того, что массив всегда статичен, его не нужно оборачивать в memo
const options = [
  { content: Currency.RUB, valueOpt: Currency.RUB },
  { content: Currency.EUR, valueOpt: Currency.EUR },
  { content: Currency.USD, valueOpt: Currency.USD },
];

export const CurrencySelect: FC<ICurrencyProps> = memo(
  ({ className, onChange, readonly, value }) => {
    const { t } = useTranslation();

    // явно преобразовываем значения из onChange в наш тип
    const onChangeHandler = useCallback(
      (valueOpt: string) => {
        onChange?.(valueOpt as Currency);
      },
      [onChange],
    );

    const childrenProps = {
      className,
      defaultValue: `${t('Укажите валюту')}`,
      direction: 'top right' as const,
      items: options,
      label: `${t('Укажите валюту')}`,
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
