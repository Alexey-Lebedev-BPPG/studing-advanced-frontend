// import { memo, useCallback, useState } from 'react';
// import cls from './HightResWrapper.module.scss';
// import { HightResModal } from '../HightResModal/HightResModal';
// import HightResSVG from '@/shared/assets/svg/HightRes/HightResIcon';
// import { classNames } from '@/shared/lib/classNames/classNames';
// import { IconButton } from '@/shared/ui/Buttons';
// import { Tooltip } from '@/shared/ui/Popovers';

// interface HightResWrapperProps {
//   className?: string;
//   frontImage: string | undefined;
//   backImage: string | undefined;
//   cardName: string;
// }
// const HightRes = memo((props: HightResWrapperProps) => {
//   const { className, backImage, cardName, frontImage } = props;
//   const [open, setOpen] = useState(false);
//   const onOpenModal = useCallback(() => {
//     setOpen(true);
//   }, []);

//   const onHandleClose = useCallback(() => {
//     setOpen(false);
//   }, []);

//   return (
//     <div className={classNames(cls.HightResModal, {}, [className])}>
//       <Tooltip
//         titleText='View in full screen'
//         textWidth='84px'
//         placement='bottom'
//       >
//         <IconButton className={cls.shape} onClick={onOpenModal}>
//           <HightResSVG />
//         </IconButton>
//       </Tooltip>
//       {!!open && (
//         <HightResModal
//           openModal={open}
//           backImage={backImage}
//           frontImage={frontImage}
//           cardName={cardName}
//           onCloseModal={onHandleClose}
//         />
//       )}
//     </div>
//   );
// });

// export default HightRes;
