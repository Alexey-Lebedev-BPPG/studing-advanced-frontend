import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text } from '@/shared/ui/deprecated/Text';

export interface INotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem: FC<INotificationItemProps> = memo(
  ({ className, item }) => {
    const { t } = useTranslation();

    const content = (
      <Card
        theme={CardTheme.OUTLINE}
        className={classNames(cls.notificationItem, {}, [className])}
      >
        <Text title={item.title} text={item.description} />
      </Card>
    );

    if (item.href)
      return (
        <a
          className={cls.link}
          target='_blank'
          href={item.href}
          rel='noreferrer'
        >
          {content}
        </a>
      );

    return content;
  },
);
