import { Splide, SplideSlide } from '@splidejs/react-splide';
import { FC, memo, useMemo, useRef } from 'react';
import cls from './reviewsBlock.module.css';
import { arrReviews } from '../model/reviews';
import { reviewsBlockSliderOptions } from '../model/sliderOptions';
import InstagramOutlined from '@/shared/assets/icons/Info.svg';
import Telegram24p from '@/shared/assets/icons/about-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import './splide.css';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Pictures } from '@/shared/ui/redesigned/Pictures';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface IReviewsBlockProps {
  className?: string;
}

export const ReviewsBlock: FC<IReviewsBlockProps> = memo(props => {
  const { className } = props;
  const language = 'ru';
  const blockRef = useRef<null | HTMLDivElement>(null);
  const blockId = 'reviewsBlock';

  const array = useMemo(() => arrReviews(language), [language]);

  return (
    <VStack
      ref={blockRef}
      className={classNames(cls['reviews-block'], {}, [className])}
      align='center'
      id={blockId}
      justify='end'
    >
      <Text
        variant='accent'
        align='center'
        text={'What do users say about Jerold'}
      />
      <HStack className={cls.buttons} gap='16'>
        <AppLink
          to='https://t.me/+oF4TUcoXW3YzMmQy'
          target='_blank'
          rel='noreferrer'
        >
          <HStack gap='16'>
            <Icon Svg={Telegram24p} color='#4CFEC9' width={24} height={24} />
            <Text variant='accent' text={'Telegram'} />
          </HStack>
        </AppLink>
        <AppLink
          to='https://www.instagram.com/jerold.trading/'
          target='_blank'
          rel='noreferrer'
        >
          <HStack gap='16'>
            <Icon
              Svg={InstagramOutlined}
              color='#4CFEC9'
              width={24}
              height={24}
            />
            <Text variant='accent' text={'Instagram'} />
          </HStack>
        </AppLink>
      </HStack>
      <Splide
        className={classNames(`${cls.slider} reviews-block-slider`)}
        options={reviewsBlockSliderOptions}
      >
        {array.map((review, index) => (
          <SplideSlide key={index}>
            <Pictures
              srcAvif={review.avif}
              srcWebp={review.webp}
              srcImage={review.png}
            />
          </SplideSlide>
        ))}
      </Splide>
    </VStack>
  );
});
