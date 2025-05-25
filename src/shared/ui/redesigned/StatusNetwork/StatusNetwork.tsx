import { FC, memo, useState } from 'react';
import cls from './statusNetwork.module.css';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IStatusNetworkProps {
  className?: string;
}

export const StatusNetwork: FC<IStatusNetworkProps> = memo(props => {
  const { className } = props;

  const [currentStatus, setCurrentStatus] = useState('');

  const updateStatus = () => {
    setCurrentStatus(navigator.onLine ? 'green' : 'red');
  };

  window.addEventListener('online', updateStatus);

  return (
    <div
      className={classNames(
        cls['status-network'],
        {
          [cls.online]: currentStatus === 'green',
          [cls.offline]: currentStatus !== 'green',
        },
        [className],
      )}
    >
      {'Status'}
    </div>
  );
});
