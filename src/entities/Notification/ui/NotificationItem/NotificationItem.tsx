import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

export interface INotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem: FC<INotificationItemProps> = memo(
  ({ className, item }) => {
    const { t } = useTranslation();

    const content = (
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={
          <CardDeprecated
            theme={CardTheme.OUTLINE}
            className={classNames(cls.notificationItem, {}, [className])}
          >
            <TextDeprecated title={item.title} text={item.description} />
          </CardDeprecated>
        }
        on={
          <Card className={classNames(cls.notificationItem, {}, [className])}>
            <Text title={item.title} text={item.description} />
          </Card>
        }
      />
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
