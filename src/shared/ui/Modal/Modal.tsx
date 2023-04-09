import React, {
  FC,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Portal } from "../../ui/Portal/Portal";
import cls from "./Modal.module.scss";
import { Overlay } from "../Overlay/Overlay";

interface IModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal: FC<IModalProps> = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
}) => {
  // обработаем анимацию закрытия модального окна
  const [isClosing, setIsClosing] = useState(false);
  // состояние, отвечающее за то, смонтирована модалка или нет
  const [isMounting, setIsMounting] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      if (timerRef?.current) {
        clearTimeout(timerRef.current);
      }
      // обязательно очищаем слушателя, чтоб он не был доступен вне модалки
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setIsMounting(true);
    }
  }, [isOpen]);

  const mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };
  // если lazy и компонент не вмонтирован, то модалку не отрисовываем
  if (lazy && !isMounting) return null;
  return (
    <Portal>
      <div className={classNames(cls.modal, mods, [className])}>
        <Overlay onClick={closeHandler} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
