import { FC, memo, useMemo } from 'react';
import cls from './dots.module.css';
import { HStack } from '../../../../Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IDotsProps {
  className?: string;
  goToSlide: (number: number) => void;
  slideNumber: number;
  slidesCount: number;
}

export const Dots: FC<IDotsProps> = memo(props => {
  const { className, goToSlide, slideNumber, slidesCount } = props;

  const renderDots = useMemo(() => {
    const dots = [];

    for (let i = 0; i < slidesCount; i++)
      dots.push(
        <div
          key={`dot-${i}`}
          className={classNames(cls.dot, { [cls.selected]: slideNumber === i })}
          onClick={() => goToSlide(i)}
        />,
      );

    return dots;
  }, [goToSlide, slideNumber, slidesCount]);

  return (
    <HStack justify='center' className={classNames(cls.dots, {}, [className])}>
      {renderDots}
    </HStack>
  );
});
