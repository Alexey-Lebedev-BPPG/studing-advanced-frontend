import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from '../model/consts/consts';
import { ListBox } from '@/shared/ui/Popups';

interface ICurrencyProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

// ввиду того, что массив всегда статичен, его не нужно оборачивать в memo
const options = [
  { content: Currency.RUB, value: Currency.RUB },
  { content: Currency.EUR, value: Currency.EUR },
  { content: Currency.USD, value: Currency.USD },
];

export const CurrencySelect: FC<ICurrencyProps> = memo(
  ({ className, value, onChange, readonly }) => {
    const { t } = useTranslation();

    // явно преобразовываем значения из onChange в наш тип
    const onChangeHandler = useCallback(
      (valueOpt: string) => {
        onChange?.(valueOpt as Currency);
      },
      [onChange],
    );

    return (
      <ListBox
        value={value}
        className={className}
        defaultValue={`${t('Укажите валюту')}`}
        label={`${t('Укажите валюту')}`}
        readonly={readonly}
        items={options}
        direction='top right'
        onChange={onChangeHandler}
      />
    );
  },
);
