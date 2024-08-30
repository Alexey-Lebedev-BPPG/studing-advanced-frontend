import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';
import cls from './zoom.module.scss';
import IncrementHeightSVG from '@/shared/assets/icons/Info.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ControlProps extends ReactZoomPanPinchContentRef {
  realWidth: number;
  reset?: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
  setStep?: Dispatch<SetStateAction<number>>;
  setZoom: Dispatch<SetStateAction<number>>;
  step: number;
  zoom: number;
}

const ControlsUI = (props: ControlProps) => {
  const {
    realWidth,
    reset,
    resetTransform,
    setReset,
    setStep,
    setZoom,
    step,
    zoom,
    zoomIn,
    zoomOut,
  } = props;

  const disabled = useMemo(() => {
    const disB = Boolean(zoom === realWidth);
    const disS = Boolean(zoom <= 300);
    return { disB, disS };
  }, [realWidth, zoom]);

  const onZoom = useCallback(() => {
    if (zoom >= realWidth) setZoom(realWidth);
    setZoom(prev => prev + step * 1000);
    zoomIn(step / 1000);
    setReset(false);
  }, [realWidth, setReset, setZoom, step, zoom, zoomIn]);

  const onZoomOut = useCallback(() => {
    if (zoom <= 300) setZoom(300);
    setZoom(prev => prev - step * 1000);
    zoomOut(step / 1000);
    setReset(false);
  }, [setReset, setZoom, step, zoom, zoomOut]);

  const resetTrans = useCallback(() => {
    if (reset) {
      resetTransform();
      setZoom(((realWidth + 300) / 9) * 4);
    }
  }, [realWidth, reset, resetTransform, setZoom]);

  useEffect(() => {
    resetTrans();
  }, [resetTrans]);

  return (
    <div className={cls.zoomActions}>
      <VStack gap='24' className={cls.actionWrapper}>
        <Icon
          clickable
          className={cls.btn}
          // disabled={disabled.disB}
          Svg={IncrementHeightSVG}
          onClick={onZoom}
        />
        <Icon
          clickable
          className={cls.btn}
          // disabled={disabled.disS}
          Svg={IncrementHeightSVG}
          onClick={onZoomOut}
        />
      </VStack>
    </div>
  );
};

export const Controls = memo(ControlsUI);
