import { memo, useCallback, useMemo, useState } from 'react';
import cls from './HightResModal.module.scss';
import { CarouselUi } from '../CarouselUi/CarouselUi';
import ShapeIconSVG from '@/shared/assets/icons/Info.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Modal } from '@/shared/ui/redesigned/Modal';
import Tooltip from '@/shared/ui/redesigned/Popups/ui/Tooltip/Tooltip';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface HightResModalProps {
  backImage?: string;
  cardName: string;
  frontImage?: string;
  onCloseModal: () => void;
  openModal: boolean;
}

const HightResModalUi = (props: HightResModalProps) => {
  const { backImage, cardName, frontImage, onCloseModal, openModal } = props;
  const [activeImg, setActiveImg] = useState(0);

  const images = useMemo(
    () => [frontImage, backImage],
    [frontImage, backImage],
  );

  const onOpenImage = useCallback(() => {
    window.open(images[activeImg], '_blank', 'noreferrer');
  }, [activeImg, images]);

  const onChangeActiveImg = useCallback((slide: number) => {
    setActiveImg(slide);
  }, []);

  return (
    <Modal isOpen={openModal} className={cls.modal} onClose={onCloseModal}>
      <VStack justify='between' className={cls.open}>
        <Tooltip
          textWidth='105px'
          placement='bottom'
          titleText={
            <>
              {'View'} <br />
              {'original media'}
            </>
          }
        >
          <Icon
            clickable
            className={cls.shape}
            Svg={ShapeIconSVG}
            onClick={onOpenImage}
          />
        </Tooltip>
      </VStack>
      <HStack justify='between' className={cls.header}>
        <h1>{cardName}</h1>
        <Icon clickable Svg={ShapeIconSVG} onClick={onCloseModal} />
      </HStack>
      <CarouselUi items={images} onChangeActiveImg={onChangeActiveImg} />
    </Modal>
  );
};

export const HightResModal = memo(HightResModalUi);
