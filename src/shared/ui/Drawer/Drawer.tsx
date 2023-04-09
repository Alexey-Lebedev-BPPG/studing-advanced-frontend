import { FC, ReactNode, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import cls from "./Drawer.module.scss";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";

export interface IDrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

// компонет, котрый ведет себя как выезжающая шторка. часто используется на мобильных экранах (у нас выезжает снизу вверх)
export const Drawer: FC<IDrawerProps> = memo(
  ({ className, children, isOpen, onClose }) => {
    const { theme } = useTheme();

    const mods = {
      [cls.opened]: isOpen,
    };
    return (
      <Portal>
        <div
          className={classNames(cls.drawer, mods, [
            className,
            theme,
            "app_drawer",
          ])}
        >
          <Overlay onClick={onClose} />
          <div className={cls.content}>{children}</div>
        </div>
      </Portal>
    );
  }
);
