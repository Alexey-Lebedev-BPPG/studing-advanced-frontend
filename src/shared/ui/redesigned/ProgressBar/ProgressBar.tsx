import { FC, memo, useMemo } from 'react';
import cls from './progressBar.module.css';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IProgressBarProps {
  className?: string;
  daysLeft: number;
  daysOverall: number;
}

export const ProgressBar: FC<IProgressBarProps> = memo(props => {
  const { className, daysLeft, daysOverall } = props;

  const restDays = useMemo(() => daysLeft <= 5, [daysLeft]);

  const percentageOfOccupancy = useMemo(
    () =>
      `${
        daysLeft && daysOverall
          ? Number((((daysOverall - daysLeft) * 100) / daysOverall).toFixed(1))
          : 0
      }%`,
    [daysLeft, daysOverall],
  );

  const classNameGradient = useMemo(
    () =>
      classNames(cls.children, {}, [
        restDays ? cls['children-red'] : cls['children-default'],
      ]),
    [restDays],
  );

  return (
    <div className={classNames(cls['progress-bar'], {}, [className])}>
      <div
        style={{ width: percentageOfOccupancy }}
        className={classNameGradient}
      />
    </div>
  );
});
