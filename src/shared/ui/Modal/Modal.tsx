import { FC, ReactNode } from 'react';
import cls from './Modal.module.scss';
import { Portal } from '../../ui/Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface IModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Modal: FC<IModalProps> = ({
  className,
  children,
  isOpen,
  onClose,
  lazy = true,
}) => {
  const { theme } = useTheme();
  const { isClosing, isMounting, close } = useModal({
    animationDelay: 300,
    isOpen,
    onClose,
  });

  const mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };
  // если lazy и компонент не вмонтирован, то модалку не отрисовываем
  if (lazy && !isMounting) return null;
  return (
    <Portal>
      <div
        className={classNames(cls.modal, mods, [className, theme, 'app_modal'])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
