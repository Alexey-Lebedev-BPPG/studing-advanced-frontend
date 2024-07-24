// import { memo, useCallback, useMemo, useState } from 'react';
// import cls from './HightResModal.module.scss';
// import { CarouselUi } from '../CarouselUi/CarouselUi';
// import { ShapeIconSVG } from '@/shared/assets/svg';
// import { CloseWhiteSVG } from '@/shared/assets/svg/buttons';
// import { IconButton } from '@/shared/ui/Buttons';
// import { Modal } from '@/shared/ui/Modal';
// import { Tooltip } from '@/shared/ui/Popovers';
// import { HStack, VStack } from '@/shared/ui/Stack';

// interface HightResModalProps {
//   openModal: boolean;
//   onCloseModal: () => void;
//   frontImage: string | undefined;
//   backImage: string | undefined;
//   cardName: string;
// }

// const HightResModalUi = (props: HightResModalProps) => {
//   const { onCloseModal, openModal, backImage, cardName, frontImage } = props;
//   const [activeImg, setActiveImg] = useState(0);

//   const images = useMemo(
//     () => [frontImage, backImage],
//     [frontImage, backImage],
//   );

//   const onOpenImage = useCallback(() => {
//     window.open(images[activeImg], '_blank', 'noreferrer');
//   }, [activeImg, images]);

//   const onChangeActiveImg = useCallback((slide: number) => {
//     setActiveImg(slide);
//   }, []);

//   return (
//     <Modal isOpen={openModal} className={cls.modal} onClose={onCloseModal}>
//       <VStack justify='between' className={cls.open}>
//         <Tooltip
//           textWidth='105px'
//           placement='bottom'
//           titleText={
//             <>
//               View <br />
//               original media
//             </>
//           }
//         >
//           <IconButton className={cls.shape} onClick={onOpenImage}>
//             <ShapeIconSVG />
//           </IconButton>
//         </Tooltip>
//       </VStack>
//       <HStack justify='between' className={cls.header}>
//         <h1>{cardName}</h1>
//         <IconButton onClick={onCloseModal}>
//           <CloseWhiteSVG />
//         </IconButton>
//       </HStack>
//       <CarouselUi items={images} onChangeActiveImg={onChangeActiveImg} />
//     </Modal>
//   );
// };

// export const HightResModal = memo(HightResModalUi);
