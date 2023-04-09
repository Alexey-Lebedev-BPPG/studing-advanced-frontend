import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import Page from "@/widgets/Page/Page";
import cls from "./ArticleEditPage.module.scss";

export interface IArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: FC<IArticleEditPageProps> = memo(({ className }) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  // если есть id, то страница для редактирования
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.articleEditPage, {}, [className])}>
      {isEdit
        ? t("Редатирование статьи с ID = ") + id
        : t("Создание новой статьи")}
    </Page>
  );
});

export default ArticleEditPage;
