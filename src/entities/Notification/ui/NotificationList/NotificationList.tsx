import { FC, memo } from 'react';
import cls from './NotificationList.module.scss';
import { useNotification } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

export interface INotificationListProps {
  className?: string;
}

export const NotificationList: FC<INotificationListProps> = memo(
  ({ className }) => {
    const { data, isLoading } = useNotification(null, {
      // запрос будет отправляться каждую секунду
      pollingInterval: 10000,
    });

    if (isLoading)
      return (
        <VStack
          max
          gap='16'
          className={classNames(cls.notificationList, {}, [className])}
        >
          <Skeleton width='100%' border='8px' height='80px' />
          <Skeleton width='100%' border='8px' height='80px' />
          <Skeleton width='100%' border='8px' height='80px' />
        </VStack>
      );

    return (
      <VStack
        max
        gap='16'
        className={classNames(cls.notificationList, {}, [className])}
      >
        {data?.map(item => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </VStack>
    );
  },
);
