import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Counter } from '@/entities/Counter';
import { Input } from '@/shared/ui/deprecated/Input';
import { showSnackbar } from '@/shared/ui/redesigned/Snackbars/Snackbars';
import { Page } from '@/widgets/Page';
import { BugButton } from '@/widgets/PageError';

const MainPage: FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const onChange = (val: string) => setValue(val);

  const change = () => {
    console.log('test');
    showSnackbar('tetttttttttttttttttst', 'error', 'ru');
  };

  return (
    <Page data-testid='MainPage'>
      {/* компонент для тестирования создания ошибки */}
      <BugButton />
      <Input value={value} placeholder='Введите текст' onChange={onChange} />
      {t('Главная страница')}
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={change}>{'test'}</button>
      <Counter />
    </Page>
  );
};

export default MainPage;
