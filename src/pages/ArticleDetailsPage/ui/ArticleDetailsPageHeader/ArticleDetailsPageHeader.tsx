import { FC, memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Button } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { getArticleDetailsData } from "entities/Article";
import cls from "./ArticleDetailsPageHeader.module.scss";
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
      <div
        className={classNames(cls.articleDetailsPageHeader, {}, [className])}
      >
        <Button onClick={onBackToList}>{t("Назад к списку")}</Button>
        {canEdit && (
          <Button onClick={onEditArticle} className={cls.editBtn}>
            {t("Редактировать")}
          </Button>
        )}
      </div>
    );
  });
