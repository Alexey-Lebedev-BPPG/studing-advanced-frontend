import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { RoutePath } from "@/shared/const/router";
import { Button } from "@/shared/ui/Button/Button";
import { getArticleDetailsData } from "@/entities/Article";
import { HStack } from "@/shared/ui/Stack";
import { getCanEditArticle } from "../../model/selectors/article";

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
