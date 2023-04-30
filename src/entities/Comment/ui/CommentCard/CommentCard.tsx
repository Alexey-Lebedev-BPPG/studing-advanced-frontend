import { FC, memo } from 'react';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ICommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard: FC<ICommentCardProps> = memo(
  ({ className, comment, isLoading }) => {
    if (isLoading)
      return (
        <VStack
          max
          gap='8'
          className={classNames(cls.commentCard, {}, [className, cls.loading])}
          data-testid='CommentCard.Loading'
        >
          <div className={cls.header}>
            <Skeleton width={30} height={30} border='50%' />
            <Skeleton width={100} height={16} className={cls.username} />
          </div>
          <Skeleton className={cls.text} width='100%' height={50} />
        </VStack>
      );

    if (!comment) return null;

    return (
      <VStack
        max
        gap='8'
        className={classNames(cls.commentCard, {}, [className])}
        data-testid='CommentCard.Content'
      >
        <AppLink to={getRouteProfile(comment?.user.id)} className={cls.header}>
          {!!comment?.user.avatar && (
            <Avatar size={30} src={comment.user.avatar} />
          )}
          <Text className={cls.username} title={comment?.user.username} />
        </AppLink>
        <Text className={cls.text} text={comment?.text} />
      </VStack>
    );
  },
);
