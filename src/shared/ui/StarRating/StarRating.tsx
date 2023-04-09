import { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./StarRating.module.scss";
import { Icon } from "../Icon/Icon";
import StarIcon from "@/shared/assets/icons/star.svg";

export interface IStartRatingProps {
  className?: string;
  // для выбора оценки
  onSelect?: (starsCount: number) => void;
  size?: number;
  // для подсветки оценки, которую раньше пользователь уже выбирал
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating: FC<IStartRatingProps> = memo(
  ({ className, onSelect, selectedStars = 0, size = 30 }) => {
    // состояние, указывающее, сколько звезд подсвечивать при наведении
    const [currentStarsCount, setCurrentStarsCount] = useState(0);
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
        {stars.map((starNumber) => (
          <Icon
            className={classNames(
              cls.starItem,
              { [cls.selected]: isSelected },
              [currentStarsCount >= starNumber ? cls.hovered : cls.normal]
            )}
            Svg={StarIcon}
            key={starNumber}
            width={size}
            height={size}
            onMouseEnter={onHover(starNumber)}
            onMouseLeave={onLeave}
            onClick={onClick(starNumber)}
          />
        ))}
      </div>
    );
  }
);
