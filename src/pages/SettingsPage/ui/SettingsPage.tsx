import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SettingsPage.module.scss';
import { UiDesignSwitcher } from '@/features/UiDesignSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

export interface ISettingsPageProps {
  className?: string;
}

const SettingsPage: FC<ISettingsPageProps> = memo(props => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page className={classNames(cls['settings-page'], {}, [className])}>
      <VStack gap='16'>
        <Text variant='accent' title={'Настройки пользователя'} />
        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
});

export default SettingsPage;
