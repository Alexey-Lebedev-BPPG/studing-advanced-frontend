import { FC, memo } from 'react';
import cls from './bannerMessage.module.css';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface IBannerMessage {
  className?: string;
  text: string;
}

export const BannerMessage: FC<IBannerMessage> = memo(props => {
  const { className, text } = props;

  return (
    <HStack className={classNames(cls['banner-message'], {}, [className])}>
      <Text variant='accent' className={cls.text} text={text} />
    </HStack>
  );
});
