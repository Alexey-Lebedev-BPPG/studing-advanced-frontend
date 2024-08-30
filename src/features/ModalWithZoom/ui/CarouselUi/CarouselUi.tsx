import { useCallback, useEffect, useMemo, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import cls from './MainSlider.module.scss';
import { Zoom } from '../ImagesZoom/Zoom';
import LeftSliderSVG from '@/shared/assets/icons/Info.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Icon } from '@/shared/ui/redesigned/Icon';

export interface MainSliderProps {
  items: (string | undefined)[];
  onChangeActiveImg: (slide: number) => void;
}

export const CarouselUi = (props: MainSliderProps) => {
  const { items, onChangeActiveImg } = props;
  const [reset, setReset] = useState(false);
  const [realSize, setRealSize] = useState(300);
  const [step, setStep] = useState<number>(1);
  const [zoom, setZoom] = useState(300);

  useEffect(() => {
    setStep(realSize / 9000); // this is for calculating the step based on their actual size of the image to be 9 step
    if (zoom > realSize) setZoom(realSize); // here if zoom more than real size, we rewrite zoom, it max zoom
    if (zoom < 300) setZoom(300); // here if zoom less than 300, we rewrite zoom, it min zoom
  }, [realSize, step, zoom]);

  useEffect(() => {
    if (step !== 1 && realSize !== 300) setZoom(((realSize + 300) / 9) * 3); // here  for default will take 4 zoom
  }, [realSize, step]);

  const SlickArrowLeft = useCallback(
    ({ currentSlide, slideCount, ...propsLeft }: any) => (
      <Icon
        {...propsLeft}
        aria-hidden='true'
        aria-disabled={currentSlide === 0}
        Svg={LeftSliderSVG}
        className={classNames(cls.next, {}, [
          `slick-prev slick-arrow${
            currentSlide === 0 ? ' slick-disabled' : ''
          }`,
        ])}
      />
    ),
    [],
  );
  const SlickArrowRight = useCallback(
    ({ currentSlide, slideCount, ...propsRight }: any) => (
      <Icon
        {...propsRight}
        aria-hidden='true'
        aria-disabled={currentSlide === slideCount - 1}
        Svg={LeftSliderSVG}
        className={classNames(cls.next, {}, [
          `slick-next slick-arrow${
            currentSlide === slideCount - 1 ? ' slick-disabled' : ''
          }`,
        ])}
      />
    ),
    [],
  );

  const settings: Settings = useMemo(
    () => ({
      autoplay: false,
      beforeChange: (currentSlide: number, next: number) => {
        setReset(true);
        setZoom(((realSize + 300) / 9) * 4);
        onChangeActiveImg(next);
      },
      centerMode: true,
      centerPadding: '0px',
      // eslint-disable-next-line react/no-unstable-nested-components
      customPaging(i: number) {
        return (
          <div key={items[i]} className={cls.Indicator}>
            <AppImage src={items[i]} alt='img' />
          </div>
        );
      },
      dots: true,
      dotsClass: cls.dotsClass,
      fade: true,
      infinite: true,
      lazyLoad: 'progressive',
      nextArrow: <SlickArrowLeft />,
      prevArrow: <SlickArrowRight />,
      speed: 500,
      touchMove: false,
    }),
    [SlickArrowLeft, SlickArrowRight, items, onChangeActiveImg, realSize],
  );
  return (
    <main
      style={{ height: '100%', padding: '3rem 3rem 7rem 6rem', width: '100%' }}
    >
      <Slider {...settings} className={cls.MainSlider}>
        {items.map((i, index) => (
          <div key={i}>
            <Zoom
              step={step}
              src={i}
              alt={`zoom-image-${index}`}
              reset={reset}
              setReset={setReset}
              zoom={zoom}
              setZoom={setZoom}
              setRealSize={setRealSize}
              realSize={realSize}
            />
          </div>
        ))}
      </Slider>
    </main>
  );
};
