import { FC, memo, useState } from 'react';
import cls from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface IStartRatingProps {
  className?: string;
  // для выбора оценки
  onSelect?: (starsCount: number) => void;
  // для подсветки оценки, которую раньше пользователь уже выбирал
  selectedStars?: number;
  size?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const StarRating: FC<IStartRatingProps> = memo(
  ({ className, onSelect, selectedStars = 0, size = 30 }) => {
    // состояние, указывающее, сколько звезд подсвечивать при наведении
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    // состояние, указывающее, что пользователь уже ранее выбрал оценку
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    // если элементы не выбраны, то устанавливаем на какую звезду пользователь направил (при этом можно использовать замыкание т.к. в эту функцию нужно будет прокидывать данные)
    const onHover = (starCount: number) => () =>
      !isSelected && setCurrentStarsCount(starCount);

    // когда выходим мышкой за пределы звезд
    const onLeave = () => !isSelected && setCurrentStarsCount(0);

    const onClick = (starCount: number) => () => {
      if (!isSelected) {
        onSelect?.(starCount);
        setCurrentStarsCount(starCount);
        setIsSelected(true);
      }
    };

    return (
      <div className={classNames(cls.starRating, {}, [className])}>
        {stars.map(starNumber => (
          <Icon
            key={starNumber}
            Svg={StarIcon}
            width={size}
            height={size}
            data-testid={`StarRating.${starNumber}`}
            // для проверки количества выбранных звезд
            data-selected={currentStarsCount >= starNumber}
            className={classNames(
              cls.starItem,
              { [cls.selected]: isSelected },
              [currentStarsCount >= starNumber ? cls.hovered : cls.normal],
            )}
            onMouseEnter={onHover(starNumber)}
            onMouseLeave={onLeave}
            onClick={onClick(starNumber)}
          />
        ))}
      </div>
    );
  },
);
