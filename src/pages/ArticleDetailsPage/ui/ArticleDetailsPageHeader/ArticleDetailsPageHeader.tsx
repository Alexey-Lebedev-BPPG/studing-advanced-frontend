import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCanEditArticle } from "../../model/selectors/article";
import { getArticleDetailsData } from "@/entities/Article";
import { RoutePath } from "@/shared/const/router";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Button";
import { HStack } from "@/shared/ui/Stack";

export interface IArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<IArticleDetailsPageHeaderProps> =
  memo(({ className }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
      navigate(RoutePath.articles);
    }, [navigate]);
    const onEditArticle = useCallback(() => {
      navigate(`${RoutePath.article_details}${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
      <HStack justify="between" max className={classNames("", {}, [className])}>
        <Button onClick={onBackToList}>{t("Назад к списку")}</Button>
        {canEdit && (
          <Button onClick={onEditArticle}>{t("Редактировать")}</Button>
        )}
      </HStack>
    );
  });
