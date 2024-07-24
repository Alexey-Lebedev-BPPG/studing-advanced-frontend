import { memo } from 'react';
import cls from './cardFormSkeleton.module.css';
import { calcSkeletonSizes } from '../../model/lib/helpers/calcSkeletonSizes';
import { useDetectDevice } from '@/shared/lib/hooks/useDetectDevice/useDetectDevice';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export interface CardFormSkeletonProps {
  productPrice?: string;
}

export const CardFormSkeleton = memo((props: CardFormSkeletonProps) => {
  const { productPrice } = props;

  const isMobile = useDetectDevice();

  const { firstRow, fourthRow, secondRow, thirdRow } = calcSkeletonSizes(
    isMobile,
    false,
  );

  return (
    <VStack className={cls['skeleton-block-wrapper']} align='center'>
      <VStack className={cls['skeleton-block']} gap='16'>
        <HStack gap='16' className={cls['skeleton-row']}>
          <Skeleton
            width='50%'
            height={firstRow.height}
            className={cls.skeleton}
          />
          <Skeleton
            width='50%'
            height={firstRow.height}
            className={cls.skeleton}
          />
        </HStack>
        <VStack gap='16' className={cls['skeleton-row']}>
          <Skeleton
            width='24%'
            height={secondRow.firstBlock.height}
            className={cls.skeleton}
          />
          <Skeleton
            width='100%'
            height={secondRow.secondBlock.height}
            className={cls.skeleton}
          />
        </VStack>
        <HStack gap='16' className={cls['skeleton-row']}>
          <VStack gap='16' className={cls['skeleton-column']}>
            <Skeleton
              width='50%'
              height={thirdRow.firstBlock.height}
              className={cls.skeleton}
            />
            <Skeleton
              width='100%'
              height={thirdRow.secondBlock.height}
              className={cls.skeleton}
            />
          </VStack>
          <VStack gap='16' className={cls['skeleton-column']}>
            <Skeleton
              width='50%'
              height={thirdRow.firstBlock.height}
              className={cls.skeleton}
            />
            <Skeleton
              width='100%'
              height={thirdRow.secondBlock.height}
              className={cls.skeleton}
            />
          </VStack>
        </HStack>
        <VStack gap='16' className={cls['skeleton-row']}>
          <Skeleton
            width='25%'
            height={fourthRow.firstBlock.height}
            className={cls.skeleton}
          />
          <Skeleton
            width='100%'
            height={fourthRow.secondBlock.height}
            className={cls.skeleton}
          />
        </VStack>
      </VStack>
      <div className={cls.btn}>
        <Skeleton width='100%' height='48' className={cls.skeleton} />
      </div>
    </VStack>
  );
});
