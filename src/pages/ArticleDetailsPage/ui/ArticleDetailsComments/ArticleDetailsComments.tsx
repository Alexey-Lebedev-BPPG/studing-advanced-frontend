import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/articleDetailsCommentSlice';
import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/AddCommentForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export interface IArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

const ArticleDetailsComments: FC<IArticleDetailsCommentsProps> = memo(
  ({ className, id }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const comments = useAppSelector(getArticleComments.selectAll);
    const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading);

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentForArticle(text));
      },
      [dispatch],
    );

    useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(id));
    });

    return (
      <VStack max gap='16' className={classNames('', {}, [className])}>
        <ToggleFeatures
          nameFeatures={'isAppRedesigned'}
          on={<Text size='l' title={`${t('Комментарии')}`} />}
          off={
            <TextDeprecated size={TextSize.L} title={`${t('Комментарии')}`} />
          }
        />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </VStack>
    );
  },
);

export default ArticleDetailsComments;
