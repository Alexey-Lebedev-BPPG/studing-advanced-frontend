import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { NotificationList } from "entities/Notification";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import NotificationIcon from "shared/assets/icons/notification-20-20.svg";
import { Popover } from "shared/ui/Popups";
import cls from "./NotificationButton.module.scss";

export interface INotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<INotificationButtonProps> = memo(
  ({ className }) => (
    <Popover
      className={classNames(cls.notificationButton, {}, [className])}
      trigger={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <Button theme={ButtonTheme.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      }
    >
      <NotificationList className={cls.notifications} />
    </Popover>
  )
);
