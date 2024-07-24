import {
  ReactNode,
  TouchEvent,
  createElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Arrows } from './components/Arrows/Arrows';
import { Dots } from './components/Dots/Dots';
import cls from './slider.module.css';
import { HStack, VStack } from '../../Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { typedMemo } from '@/shared/lib/typedMemo/typedMemo';

interface ISliderProps<T> {
  autoPlay?: boolean;
  autoPlayTime?: number;
  children: ReactNode;
  className?: string;
  classNameArrow?: string;
  classNameDots?: string;
  control?: boolean;
  dotsCount?: number;
  height?: string;
  isDots?: boolean;
  items: T[];
  width?: string;
}

export const Slider = typedMemo(
  <T extends ValidRowModel>(props: ISliderProps<T>) => {
    const {
      autoPlay = false,
      autoPlayTime = 5000,
      children,
      className,
      classNameArrow,
      classNameDots,
      control = false,
      dotsCount,
      height = '100%',
      isDots = false,
      items,
      width = '100%',
    } = props;

    const [slide, setSlide] = useState(0);
    const [touchPosition, setTouchPosition] = useState<number | null>(null);

    const preloadImages = useCallback(() => {
      const prevItemIndex = slide - 1 < 0 ? items.length - 1 : slide - 1;
      const nextItemIndex = (slide + 1) % items.length;

      new Image().src = items[slide]?.url;
      new Image().src = items[prevItemIndex].url;
      new Image().src = items[nextItemIndex].url;
    }, [items, slide]);

    useEffect(() => {
      if (items.length) preloadImages();
    }, [slide, items, preloadImages]);

    const changeSlide = useCallback(
      (direction = 1) => {
        let slideNumber = 0;

        if (slide + direction < 0) slideNumber = items.length - 1;
        else slideNumber = (slide + direction) % items.length;

        setSlide(slideNumber);
      },
      [items.length, slide],
    );

    const goToSlide = useCallback(
      (number: number) => {
        setSlide(number % items.length);
      },
      [items.length],
    );

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
      const touchDown = e.touches[0].clientX;

      setTouchPosition(touchDown);
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
      if (touchPosition === null) return;

      const currentPosition = e.touches[0].clientX;
      const direction = touchPosition - currentPosition;

      if (direction > 10) changeSlide(1);

      if (direction < -10) changeSlide(-1);

      setTouchPosition(null);
    };

    useEffect(() => {
      if (!autoPlay) return;

      const interval = setInterval(() => {
        changeSlide(1);
      }, autoPlayTime);

      return () => {
        clearInterval(interval);
      };
    }, [autoPlay, autoPlayTime, changeSlide, items.length, slide]);

    return (
      <VStack
        align='center'
        className={classNames(cls.slider, {}, [className])}
        style={{ height, width }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {!!control && (
          <Arrows className={classNameArrow} changeSlide={changeSlide} />
        )}
        <HStack
          className={cls['slide-list']}
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {!!items.length &&
            !!children &&
            items.map((item, index) => (
              <HStack
                key={`item-${index}`}
                max
                align='start'
                className={classNames(cls.slide, {}, [])}
              >
                {/* if need multi, need to do */}
                {/* @ts-ignore */}
                {createElement(children, { ...items[slide] })}
              </HStack>
            ))}
        </HStack>
        {!!isDots && (
          <Dots
            className={classNameDots}
            slideNumber={slide}
            goToSlide={goToSlide}
            slidesCount={dotsCount || items?.length || 3}
          />
        )}
      </VStack>
    );
  },
);
