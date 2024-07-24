import { FC, Fragment, memo, useCallback, useMemo } from 'react';
import cls from './stepper.module.css';
import { Icon } from '../../Icon';
import { HStack } from '../../Stack';
import ErrorNewSVG from '@/shared/assets/icons/Info.svg';
import ActiveNewSVG from '@/shared/assets/icons/about-20-20.svg';
import InactiveNewSVG from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IStepperProps {
  className?: string;
  currentStep: IntRange<1, 10>;
  error?: boolean;
  steps?: IntRange<1, 10>;
}

export const Stepper: FC<IStepperProps> = memo(props => {
  const { className, currentStep, error = false, steps = 4 } = props;

  const arr = useMemo(() => [...Array(steps).keys()].map(i => i + 1), [steps]);

  const currentDot = useCallback(
    (ind: number) => {
      if (error && ind === currentStep + 1) return ErrorNewSVG;
      if (ind <= currentStep) return ActiveNewSVG;

      return InactiveNewSVG;
    },
    [currentStep, error],
  );

  const currentColorClassNameLine = useCallback(
    (ind: number) =>
      classNames(
        cls.line,
        {
          [cls.start]: ind === currentStep && !error,
          [cls.middle]: ind < currentStep,
          [cls.error]: error && currentStep === ind,
        },
        [],
      ),
    [currentStep, error],
  );

  return (
    <HStack max className={classNames(cls.stepper, {}, [className])}>
      {arr.map(item => (
        <Fragment key={item}>
          <Icon
            Svg={currentDot(item)}
            className={cls.dot}
            width={30}
            height={30}
          />
          {item !== arr.length && (
            <div className={currentColorClassNameLine(item)} />
          )}
        </Fragment>
      ))}
    </HStack>
  );
});
