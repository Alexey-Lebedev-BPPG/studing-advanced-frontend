import { FC, memo, useCallback, useState } from 'react';
import cls from './NotificationButton.module.scss';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useDetectDevice } from '@/shared/lib/hooks/useDetectDevice/useDetectDevice';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Popover } from '@/shared/ui/deprecated/Popups';

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
      <Button theme={ButtonTheme.CLEAR} onClick={onOpenDrawer}>
        <Icon inverted Svg={NotificationIcon} />
      </Button>
    );
    return (
      <div>
        {isMobile ? (
          <>
            {trigger}
            {/* оборачиваем компонент для ленивой подгрузки библиотек, которые в нем используются */}
            <Drawer isOpen={isOpenDrawer} onClose={onCloseDrawer}>
              <NotificationList />
            </Drawer>
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
  },
);
