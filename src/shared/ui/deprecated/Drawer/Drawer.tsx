import { FC, ReactNode, useCallback, useEffect } from 'react';
import cls from './Drawer.module.scss';
import { Overlay } from '../../redesigned/Overlay/Overlay';
import { Portal } from '../../redesigned/Portal';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  AnimationProvider,
  useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface DrawerProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  lazy?: boolean;
  onClose?: () => void;
}

const height = window.innerHeight - 100;

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
const DrawerContent: FC<DrawerProps> = ({
  children,
  className,
  isOpen,
  lazy = true,
  onClose,
}) => {
  // получаем библиотеки, которые подгружали лениво
  const { Gesture, Spring } = useAnimationLibs();
  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
  const { theme } = useTheme();

  const openDrawer = useCallback(() => {
    api.start({ immediate: false, y: 0 });
  }, [api]);

  useEffect(() => {
    if (isOpen) openDrawer();
  }, [api, isOpen, openDrawer]);

  const close = (velocity = 0) => {
    api.start({
      config: { ...Spring.config.stiff, velocity },
      immediate: false,
      onResolve: onClose,
      y: height,
    });
  };

  const bind = Gesture.useDrag(
    ({
      cancel,
      direction: [, dy],
      last,
      movement: [, my],
      velocity: [, vy],
    }) => {
      if (my < -70) cancel();

      if (last)
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) close();
        else openDrawer();
      else api.start({ immediate: true, y: my });
    },
    {
      bounds: { top: 0 },
      filterTaps: true,
      from: () => [0, y.get()],
      rubberband: true,
    },
  );

  if (!isOpen) return null;

  const display = y.to(py => (py < height ? 'block' : 'none'));

  return (
    <Portal>
      <div
        className={classNames(cls.Drawer, {}, [className, theme, 'app_drawer'])}
      >
        <Overlay onClick={close} />
        <Spring.a.div
          className={cls.sheet}
          style={{ bottom: `calc(-100vh + ${height - 100}px)`, display, y }}
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
};

// асинхронный компонент
const DrawerAsync = (props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) return null;

  return <DrawerContent {...props} />;
};

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
// компонент, который ведет себя как выезжающая шторка. часто используется на мобильных экранах (у нас выезжает снизу вверх)
export const Drawer = (props: DrawerProps) => (
  <AnimationProvider>
    <DrawerAsync {...props} />
  </AnimationProvider>
);
