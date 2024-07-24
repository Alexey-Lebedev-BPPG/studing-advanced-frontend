import { FC, memo } from 'react';
import cls from './NotificationList.module.scss';
import { useNotification } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
// import { ReadableStreamDefaultReadDoneResult } from 'stream/web';

interface INotificationListProps {
  className?: string;
}

export const NotificationList: FC<INotificationListProps> = memo(props => {
  const { className } = props;

  // пример стрима для получения уведомлений. запускаем его в useEffect
  // const reqLimit = 0;
  // let reqMade = 0;
  // const notificationsStream = useCallback(async () => {
  //   if (!isStreaming && isLogin && isAuth && reqMade <= reqLimit) {
  //     setIsStreaming(true);
  //     try {
  //       reqMade++;
  //       const stream = await fetch(`${api}notifications/subscribe`, {
  //         credentials: 'include',
  //         headers: {
  //           'Access-Control-Allow-Origin': api || '',
  //           Connection: 'keep-alive',
  //           allowHTTP1ForStreamingUpload: 'true',
  //           mode: 'cors',
  //         },
  //       }).catch(error => {
  //         console.error(error.response, 'stream-error');
  //         return setIsStreaming(false);
  //       });
  //       const streamReader = stream?.body
  //         ?.pipeThrough(new TextDecoderStream())
  //         .getReader();

  //       while (stream) {
  //         const { value, done } =
  //           // eslint-disable-next-line no-await-in-loop
  //           (await streamReader?.read()) as ReadableStreamDefaultReadDoneResult;
  //         if (done) {
  //           setIsStreaming(false);
  //           break;
  //         }
  //         if ((JSON.stringify(value)?.length > 10) as boolean) {
  //           if (isLogin && isAuth && isStreaming) getAllNotificationForApi();

  //           dispatch(setAllNotificationsSlice(data || []));
  //         }
  //       }
  //     } catch (e) {
  //       console.log('Subscribe stream axios error:', e);
  //       setIsStreaming(false);
  //     }
  //   }
  // }, [isStreaming, reqMade, api, isLogin, isAuth, getAllNotificationForApi, dispatch, data]);

  const { data, isLoading } = useNotification(null, {
    // запрос будет отправляться каждую секунду
    pollingInterval: 10000,
  });

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => SkeletonDeprecated,
    on: () => SkeletonRedesigned,
  });

  if (isLoading)
    return (
      <VStack
        max
        gap='16'
        className={classNames(cls['notification-list'], {}, [className])}
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
      className={classNames(cls['notification-list'], {}, [className])}
    >
      {data?.map(item => <NotificationItem key={item.id} item={item} />)}
    </VStack>
  );
});
