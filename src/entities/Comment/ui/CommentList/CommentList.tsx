import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { Comment } from "../../model/types/comment";
import { CommentCard } from "../CommentCard/CommentCard";
import { classNames } from "@/shared/lib/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

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
        <VStack gap="16" max className={classNames("", {}, [className])}>
          <CommentCard isLoading />
          <CommentCard isLoading />
          <CommentCard isLoading />
        </VStack>
      );

    return (
      <VStack gap="16" max className={classNames("", {}, [className])}>
        {comments?.length ? (
          comments.map((comment) => (
            <CommentCard
              isLoading={isLoading}
              comment={comment}
              key={comment.id}
            />
          ))
        ) : (
          <Text text={t("Комментарии отсутствуют")} />
        )}
      </VStack>
    );
  }
);
