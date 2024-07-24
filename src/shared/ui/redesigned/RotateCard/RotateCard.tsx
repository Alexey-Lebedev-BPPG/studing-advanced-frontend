import { FC, memo } from 'react';
import cls from './rotateCard.module.scss';
import { AppImage } from '../AppImage';
import { HStack } from '../Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
// import { selectBackgroundInStatusCard } from '@/shared/styles/const';

type TypeImage = 's' | 'm' | 'l' | 'xl' | 'xxl';
type IOrientation = 'horizontal' | 'vertical';
type IStatusCards =
  | 'Transferred'
  | 'Minted'
  | 'Rejected'
  | 'RequestedBack'
  | 'Burned'
  | 'AwaitingSign'
  | '';

export const getCurrentSizeImageInTable = (
  orientation: IOrientation,
  typeImage?: TypeImage,
) => {
  const currentOrientation = orientation === 'horizontal';

  if (typeImage === 'm')
    return {
      height: currentOrientation ? '30px' : '50px',
      width: currentOrientation ? '50px' : '30px',
    };
  if (typeImage === 'l')
    return {
      height: currentOrientation ? '120px' : '270px',
      width: currentOrientation ? '204px' : '159px',
    };
  if (typeImage === 'xl')
    return {
      height: currentOrientation ? '168px' : '284px',
      width: currentOrientation ? '284px' : '168px',
    };
  if (typeImage === 'xxl')
    return {
      height: currentOrientation ? '253px' : '568px',
      width: currentOrientation ? '433px' : '334px',
    };

  return {
    height: currentOrientation ? '24px' : '40px',
    width: currentOrientation ? '40px' : '24px',
  };
};

interface IRotateCardProps {
  alt?: string;
  backImage: string;
  frontImage: string;
  inShipment?: boolean;
  orientation: IOrientation;
  status: IStatusCards;
}

export const RotateCard: FC<IRotateCardProps> = memo(props => {
  const {
    alt = '',
    backImage,
    frontImage,
    inShipment = false,
    orientation,
    status,
  } = props;

  const { height, width } = getCurrentSizeImageInTable(
    orientation,
    inShipment ? 'l' : 'xxl',
  );

  // const colorBackground = selectBackgroundInStatusCard(status);

  return (
    <HStack
      justify='center'
      className={classNames(cls['rotate-card'], {}, [
        // colorBackground
      ])}
    >
      <HStack justify='center' className={cls.front}>
        <AppImage src={frontImage} alt={alt} width={width} height={height} />
      </HStack>
      <HStack max justify='center' className={cls.back}>
        <AppImage src={backImage} alt={alt} width={width} height={height} />
      </HStack>
    </HStack>
  );
});
