import { FC, memo } from 'react';
import cls from './appLogo.module.scss';
import { HStack } from '../../Stack';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IAppLogoProps {
  className?: string;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const AppLogo: FC<IAppLogoProps> = memo(({ className }) => (
  <HStack
    max
    justify='center'
    className={classNames(cls.appLogoWrapper, {}, [className])}
  >
    <div className={cls.gradientBig} />
    <div className={cls.gradientSmall} />
    <AppSvg className={cls.appLogo} />
  </HStack>
));
