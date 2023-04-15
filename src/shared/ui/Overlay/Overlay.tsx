import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Overlay.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface IOverlayProps {
  className?: string;
  onClick?: () => void;
}

// компонент для затемнения модального окна
export const Overlay: FC<IOverlayProps> = memo(({ className, onClick }) => {
  const { t } = useTranslation();

  return (
    <div onClick={onClick} className={classNames(cls.overlay, {}, [className])}>
      <div />
    </div>
  );
});
