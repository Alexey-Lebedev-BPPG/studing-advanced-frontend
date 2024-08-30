import { memo, useCallback, useState } from 'react';
import cls from './HightResWrapper.module.scss';
import { HightResModal } from '../HightResModal/HightResModal';
import HightResSVG from '@/shared/assets/icons/Info.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';
import Tooltip from '@/shared/ui/redesigned/Popups/ui/Tooltip/Tooltip';

interface HightResWrapperProps {
  backImage?: string;
  cardName: string;
  className?: string;
  frontImage?: string;
}
const HightRes = memo((props: HightResWrapperProps) => {
  const { backImage, cardName, className, frontImage } = props;
  const [open, setOpen] = useState(false);
  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onHandleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className={classNames(cls.HightResModal, {}, [className])}>
      <Tooltip
        titleText='View in full screen'
        textWidth='84px'
        placement='bottom'
      >
        <Icon
          clickable
          className={cls.shape}
          Svg={HightResSVG}
          onClick={onOpenModal}
        />
      </Tooltip>
      {!!open && (
        <HightResModal
          openModal={open}
          backImage={backImage}
          frontImage={frontImage}
          cardName={cardName}
          onCloseModal={onHandleClose}
        />
      )}
    </div>
  );
});

export default HightRes;
