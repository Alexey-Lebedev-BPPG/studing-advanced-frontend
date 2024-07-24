// import {
//   Dispatch,
//   memo,
//   SetStateAction,
//   useCallback,
//   useEffect,
//   useMemo,
// } from 'react';
// import { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';
// import cls from './zoom.module.scss';
// import { IncrementHeightSVG, DecrementHeightSVG } from '@/shared/assets/svg';
// import { IconButton } from '@/shared/ui/Buttons';
// import { VStack } from '@/shared/ui/Stack';

// interface ControlProps extends ReactZoomPanPinchContentRef {
//   reset?: boolean;
//   setStep?: Dispatch<SetStateAction<number>>;
//   step: number;
//   setReset: Dispatch<SetStateAction<boolean>>;
//   setZoom: Dispatch<SetStateAction<number>>;
//   zoom: number;
//   realWidth: number;
// }

// const ControlsUI = (props: ControlProps) => {
//   const {
//     zoomIn,
//     zoomOut,
//     resetTransform,
//     reset,
//     setReset,
//     setZoom,
//     realWidth,
//     zoom,
//     step,
//     setStep,
//   } = props;

//   const disabled = useMemo(() => {
//     const disB = Boolean(zoom === realWidth);
//     const disS = Boolean(zoom <= 300);
//     return { disB, disS };
//   }, [realWidth, zoom]);

//   const onZoom = useCallback(() => {
//     if (zoom >= realWidth) setZoom(realWidth);
//     setZoom(prev => prev + step * 1000);
//     zoomIn(step / 1000);
//     setReset(false);
//   }, [realWidth, setReset, setZoom, step, zoom, zoomIn]);

//   const onZoomOut = useCallback(() => {
//     if (zoom <= 300) setZoom(300);
//     setZoom(prev => prev - step * 1000);
//     zoomOut(step / 1000);
//     setReset(false);
//   }, [setReset, setZoom, step, zoom, zoomOut]);

//   const resetTrans = useCallback(() => {
//     if (reset) {
//       resetTransform();
//       setZoom(((realWidth + 300) / 9) * 4);
//     }
//   }, [realWidth, reset, resetTransform, setZoom]);

//   useEffect(() => {
//     resetTrans();
//   }, [resetTrans]);

//   return (
//     <div className={cls.zoomActions}>
//       <VStack gap={1.5} className={cls.actionWrapper}>
//         <IconButton
//           className={cls.btn}
//           disabled={disabled.disB}
//           onClick={onZoom}
//         >
//           <IncrementHeightSVG />
//         </IconButton>
//         <IconButton
//           className={cls.btn}
//           disabled={disabled.disS}
//           onClick={onZoomOut}
//         >
//           <DecrementHeightSVG />
//         </IconButton>
//       </VStack>
//     </div>
//   );
// };

// export const Controls = memo(ControlsUI);
