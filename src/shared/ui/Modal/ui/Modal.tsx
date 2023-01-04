import { useTheme } from "app/providers/ThemeProvider";
import React, {
  FC,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Portal } from "shared/ui/Portal";
import cls from "./Modal.module.scss";

interface IModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal: FC<IModalProps> = ({
  className,
  children,
  isOpen,
  onClose,
}) => {
  // обработаем анимацию закрытия модального окна
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // так делать не нужно!!!!!!!!!!!!позже поправим
  const { theme } = useTheme();

  // функция закрытия модалки
  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  // чтоб не срабатывала closeHandler на контенте
  const onContentClick = (event: React.MouseEvent) => event.stopPropagation();

  // оборачиваем в useCallback, чтоб при каждом рендеринге не создавалась новая функция, а сохранялась ссылка на старую
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler]
  );

  useEffect(() => {
    if (isOpen) {
      // навешиваем слушателя на все приложение, чтоб закрывать модалку по клавише Escape
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      clearTimeout(timerRef.current);
      // обязательно очищаем слушателя, чтоб он не был доступен вне модалки
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
    // так делать не нужно!!!!!!!!!!!!позже поправим
    // @ts-ignore
    [cls[theme]]: true,
  };

  return (
    <Portal>
      <div className={classNames(cls.modal, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
