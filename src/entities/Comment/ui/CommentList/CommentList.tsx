import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import cls from "./CommentList.module.scss";
import { Comment } from "../../model/types/comment";
import { CommentCard } from "../CommentCard/CommentCard";

interface ICommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList: FC<ICommentListProps> = memo(
  ({ className, comments, isLoading }) => {
    const { t } = useTranslation();

    return (
      <div className={classNames(cls.commentList, {}, [className])}>
        {comments?.length ? (
          comments.map((comment) => (
            <CommentCard
              className={cls.comment}
              isLoading={isLoading}
              comment={comment}
              key={comment.id}
            />
          ))
        ) : (
          <Text text={t("Комментарии отсутствуют")} />
        )}
      </div>
    );
  }
);
