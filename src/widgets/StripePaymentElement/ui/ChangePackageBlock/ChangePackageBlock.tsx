import { memo } from 'react';
import cls from './changePackageBlock.module.css';
import InfoCircleOutlinedSVG from '@/shared/assets/icons/Info.svg';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Flex, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export interface ChangePackageBlockProps {
  packageName?: string;
  packageType?: string;
}

export const ChangePackageBlock = memo((props: ChangePackageBlockProps) => {
  const { packageName, packageType } = props;

  const telegramLink = process.env.BOT_URL;

  const redirectToTelegram = () => window.open(telegramLink);

  return (
    <Modal isOpen>
      <VStack className={cls.wrapper} gap='16'>
        <Flex
          direction='row'
          gap='16'
          justify='start'
          align='center'
          wrap='wrap'
        >
          <Icon
            color='#fff'
            height={24}
            width={24}
            Svg={InfoCircleOutlinedSVG}
          />
          <Text
            variant='accent'
            text={packageName === 'Screener' ? packageName : packageType}
          />
          <Text
            variant='accent'
            text={packageName === 'Screener' ? packageType : packageName}
          />
          <Text
            variant='accent'
            className={cls['ordinary-text']}
            text={'is active'}
          />
        </Flex>
        <Text variant='accent' text={'Please wait'} />
        <Text variant='accent' text={'You can also'} />
        <Button
          fullWidth
          type='submit'
          // text={'Choose another subscription'}
          onClick={redirectToTelegram}
        />
      </VStack>
    </Modal>
  );
});
