import { FC, ReactNode, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { useModal } from "shared/lib/hooks/useModal/useModal";
import cls from "./Drawer.module.scss";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";

export interface IDrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

// компонет, котрый ведет себя как выезжающая шторка. часто используется на мобильных экранах (у нас выезжает снизу вверх)
export const Drawer: FC<IDrawerProps> = memo(
  ({ className, children, isOpen, onClose, lazy }) => {
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
          className={classNames(cls.drawer, mods, [
            className,
            theme,
            "app_drawer",
          ])}
        >
          <Overlay onClick={close} />
          <div className={cls.content}>{children}</div>
        </div>
      </Portal>
    );
  }
);
