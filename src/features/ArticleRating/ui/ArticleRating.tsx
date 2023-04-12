import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  useArticleRating,
  useCreateArticleRating,
} from "../api/articleRatingApi";
import { RatingCard } from "@/entities/Rating";
import { getUserAuthData } from "@/entities/User";
import { Skeleton } from "@/shared/ui/Skeleton";

export interface IArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating: FC<IArticleRatingProps> = memo(
  ({ className, articleId }) => {
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const { data, isLoading } = useArticleRating({
      articleId,
      userId: userData?.id || "",
    });
    // использование запроса на создание
    const [rateArticleMutation, { isLoading: isLoadingCreate }] =
      useCreateArticleRating();

    const rating = data?.[0];

    // ввиду того, что в onAccept и onCancel будет отправляться один и тот же запрос, то выносим его в отдельную функцию, которую переиспользуем
    const handleRateArticleMutation = useCallback(
      (starCount: number, feedback?: string) => {
        try {
          rateArticleMutation({
            articleId,
            rate: starCount,
            userId: userData?.id || "",
            feedback,
          });
        } catch (error) {
          console.log("error", error);
        }
      },
      [articleId, rateArticleMutation, userData?.id]
    );

    const onAccept = useCallback(
      (starCount: number, feedback?: string) =>
        handleRateArticleMutation(starCount, feedback),
      [handleRateArticleMutation]
    );

    const onCancel = useCallback(
      (starCount: number) => handleRateArticleMutation(starCount),
      [handleRateArticleMutation]
    );

    if (isLoading) return <Skeleton width="100%" height={120} />;

    return (
      <RatingCard
        onAccept={onAccept}
        onCancel={onCancel}
        rate={rating?.rate}
        className={className}
        title={t("Оцените статью")}
        feedbackTitle={t(
          "Оставьте свой отзыв о статье, это поможет улучшить качество"
        )}
        hasFeedback
      />
    );
  }
);

export default ArticleRating;