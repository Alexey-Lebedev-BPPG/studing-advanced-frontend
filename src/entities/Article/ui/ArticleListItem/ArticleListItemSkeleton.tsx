import { FC, memo } from 'react';
import cls from './ArticleListItem.module.scss';
import { ArticleView } from '../../model/consts/consts';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

export interface IArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton: FC<IArticleListItemSkeletonProps> = memo(
  props => {
    const { className, view } = props;

    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      off: () => SkeletonDeprecated,
      on: () => SkeletonRedesigned,
    });

    const Card = toggleFeatures({
      name: 'isAppRedesigned',
      off: () => CardDeprecated,
      on: () => CardRedesigned,
    });

    const mainClass = toggleFeatures({
      name: 'isAppRedesigned',
      off: () => cls.articleListItem,
      on: () => cls.articleListItemRedesigned,
    });

    if (view === ArticleView.BIG)
      return (
        <div className={classNames(mainClass, {}, [className, cls[view]])}>
          <Card>
            <div className={cls.header}>
              <Skeleton border='50%' width={30} height={30} />
              <Skeleton width={150} height={16} className={cls.username} />
              <Skeleton width={150} height={16} className={cls.date} />
            </div>
            <Skeleton width={250} height={24} className={cls.title} />
            <Skeleton height={200} className={cls.img} />
            <div className={cls.footer}>
              <Skeleton width={200} height={36} />
            </div>
          </Card>
        </div>
      );

    return (
      <div className={classNames(mainClass, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.imageWrapper}>
            <Skeleton width={200} height={200} className={cls.img} />
          </div>
          <div className={cls.infoWrapper}>
            <Skeleton width={130} height={16} />
          </div>
          <Skeleton width={150} height={16} className={cls.title} />
        </Card>
      </div>
    );
  },
);
