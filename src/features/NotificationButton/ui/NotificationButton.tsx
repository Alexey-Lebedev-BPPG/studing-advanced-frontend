import { FC, memo, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { NotificationList } from "entities/Notification";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import NotificationIcon from "shared/assets/icons/notification-20-20.svg";
import { Popover } from "shared/ui/Popups";
import { Drawer } from "shared/ui/Drawer/Drawer";
import { useDetectDevice } from "shared/lib/hooks/useDetectDevice/useDetectDevice";
import { AnimationProvider } from "shared/lib/components/AnimationProvider";
import cls from "./NotificationButton.module.scss";

export interface INotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<INotificationButtonProps> = memo(
  ({ className }) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const isMobile = useDetectDevice();

    const onOpenDrawer = useCallback(() => {
      setIsOpenDrawer(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
      setIsOpenDrawer(false);
    }, []);

    const trigger = (
      <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
        <Icon Svg={NotificationIcon} inverted />
      </Button>
    );
    return (
      <div>
        {isMobile ? (
          <>
            {trigger}
            {/* оборачиваем компонент для ленивой подгрузки библиотек, которые в нем используются */}
            <AnimationProvider>
              <Drawer isOpen={isOpenDrawer} onClose={onCloseDrawer}>
                <NotificationList />
              </Drawer>
            </AnimationProvider>
          </>
        ) : (
          <Popover
            className={classNames(cls.notificationButton, {}, [className])}
            trigger={trigger}
          >
            <NotificationList className={cls.notifications} />
          </Popover>
        )}
      </div>
    );
  }
);
