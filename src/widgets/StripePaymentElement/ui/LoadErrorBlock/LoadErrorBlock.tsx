import { FC, memo } from 'react';
import cls from './loadErrorBlock.module.css';
import ErrorCircleSVG from '@/shared/assets/icons/Info.svg';
import { useDetectDevice } from '@/shared/lib/hooks/useDetectDevice/useDetectDevice';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const LoadErrorBlock: FC<{ getClientSecret: () => Promise<void> }> =
  memo(({ getClientSecret }) => {
    const isDesktop = useDetectDevice();

    return (
      <VStack
        className={cls.wrapper}
        align={isDesktop ? 'start' : 'center'}
        gap='16'
      >
        <VStack className={cls['info-block']} gap='16' align='center'>
          <Icon width={120} height={120} Svg={ErrorCircleSVG} />
          <VStack className={cls['text-block']} gap='16'>
            <Text
              align='center'
              variant='accent'
              className={cls['title-text']}
              text={'Something went wrong'}
            />
            <Text variant='accent' text={'error payment'} />
          </VStack>
        </VStack>
        <Button
          fullWidth
          className={cls.btn}
          type='submit'
          // text={t('Try again')}
          onClick={getClientSecret}
        />
      </VStack>
    );
  });
