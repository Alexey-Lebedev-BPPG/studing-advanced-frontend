import { FC, memo } from 'react';
import cls from './arrows.module.css';
import { HStack } from '../../../../Stack';
// import {
//   ArrowLeftOutlinedSVG,
//   ArrowRightOutlinedSVG,
// } from '@/shared/assets/svg/Main/Arrows';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IArrowsProps {
  changeSlide: (direction?: number) => void;
  className?: string;
}

export const Arrows: FC<IArrowsProps> = memo(props => {
  const { changeSlide, className } = props;

  return (
    <HStack
      max
      justify='between'
      className={classNames(cls.arrows, {}, [className])}
    >
      {'test'}
      {/* <Icon
        clickable
        width={24}
        height={24}
        Svg={ArrowLeftOutlinedSVG}
        onClick={() => changeSlide(-1)}
      />
      <Icon
        clickable
        width={24}
        height={24}
        Svg={ArrowRightOutlinedSVG}
        onClick={() => changeSlide(1)}
      /> */}
    </HStack>
  );
});
