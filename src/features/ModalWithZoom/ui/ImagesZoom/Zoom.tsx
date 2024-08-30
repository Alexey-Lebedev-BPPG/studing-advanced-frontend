import {
  Dispatch,
  memo,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Controls } from './Controls';
import cls from './zoom.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Spinner } from '@/shared/ui/redesigned/Loaders';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ImageZoomProps {
  alt?: string;
  className?: string;
  realSize: number;
  reset: boolean;
  setRealSize: Dispatch<SetStateAction<number>>;
  setReset: Dispatch<SetStateAction<boolean>>;
  setZoom: Dispatch<SetStateAction<number>>;
  src: string | undefined;
  step: number;
  zoom: number;
}

const ImageZoom = (props: ImageZoomProps) => {
  const {
    alt = 'ZoomImage',
    className,
    realSize,
    reset,
    setRealSize,
    setReset,
    setZoom,
    src,
    step,
    zoom,
  } = props;
  const [panning, setPanning] = useState<boolean>(false);
  const onLoadHandle = (e: SyntheticEvent<HTMLImageElement>) => {
    setRealSize(e.currentTarget.naturalWidth); // real images size
  };

  const onMouseDown = () => {
    setPanning(true);
  };

  const onMouseUp = () => {
    setPanning(false);
  };

  return (
    <div className={classNames(cls.figureClass, {}, [className])}>
      <TransformWrapper
        centerOnInit
        centerZoomedOut
        initialScale={1}
        maxScale={9}
        limitToBounds={false}
        wheel={{ disabled: true }}
        alignmentAnimation={{
          disabled: true,
        }}
        velocityAnimation={{
          disabled: true,
          equalToMove: false,
          sensitivity: 70,
        }}
        doubleClick={{
          disabled: true,
        }}
      >
        {utils => (
          <div className={cls.mainWrapper}>
            <Controls
              {...utils}
              reset={reset}
              setReset={setReset}
              setZoom={setZoom}
              realWidth={realSize}
              zoom={zoom}
              step={step}
            />
            <TransformComponent
              contentClass={cls.zoomContent}
              wrapperClass={classNames(cls.zoomWrapper, {
                [cls.panning]: panning,
              })}
            >
              <div
                className={cls.imageWrapper}
                style={{ width: `${zoom}px` }}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
              >
                <AppImage
                  id={src}
                  src={src}
                  alt={alt}
                  width='100%'
                  height='100%'
                  className={classNames(cls.AppImages)}
                  fallback={
                    <VStack
                      max
                      justify='center'
                      align='center'
                      style={{ height: '100%' }}
                    >
                      <Spinner />
                    </VStack>
                  }
                  onLoad={onLoadHandle}
                />
              </div>
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};

export const Zoom = memo(ImageZoom);
