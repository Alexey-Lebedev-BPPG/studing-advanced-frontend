import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleEditForm.module.scss";

export interface IArticleEditFormProps {
  className?: string;
}

const ArticleEditForm: FC<IArticleEditFormProps> = memo(({ className }) => {
  const { t } = useTranslation();
  console.log(t("tests"));

  return (
    <div className={classNames(cls.articleEditForm, {}, [className])}>
      <div />
    </div>
  );
});

export default ArticleEditForm;