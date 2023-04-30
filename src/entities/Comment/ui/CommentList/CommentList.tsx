import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ICommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList: FC<ICommentListProps> = memo(
  ({ className, comments, isLoading }) => {
    const { t } = useTranslation();

    if (isLoading)
      return (
        <VStack max gap='16' className={classNames('', {}, [className])}>
          <CommentCard isLoading />
          <CommentCard isLoading />
          <CommentCard isLoading />
        </VStack>
      );

    return (
      <VStack max gap='16' className={classNames('', {}, [className])}>
        {comments?.length ? (
          comments.map(comment => (
            <CommentCard
              key={comment.id}
              isLoading={isLoading}
              comment={comment}
            />
          ))
        ) : (
          <Text text={`${t('Комментарии отсутствуют')}`} />
        )}
      </VStack>
    );
  },
);
