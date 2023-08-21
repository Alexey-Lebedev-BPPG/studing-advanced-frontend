import { FC, memo } from 'react';
import cls from './appLogo.module.scss';
import { HStack } from '../../Stack';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IAppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo: FC<IAppLogoProps> = memo(props => {
  const { className, size = 50 } = props;

  return (
    <HStack
      max
      justify='center'
      className={classNames(cls.appLogoWrapper, {}, [className])}
    >
      <AppSvg
        width={size}
        height={size}
        color='black'
        className={cls.appLogo}
      />
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
    </HStack>
  );
});
