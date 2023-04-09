import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import Page from "@/widgets/Page/Page";
import cls from "./ForbiddenPage.module.scss";

export interface IForbiddenPageProps {
  className?: string;
}

const ForbiddenPage: FC<IForbiddenPageProps> = memo(({ className }) => {
  const { t } = useTranslation();

  return (
    <Page className={classNames(cls.forbiddenPage, {}, [className])}>
      {t("У Вас нет доступа на эту страницу")}
    </Page>
  );
});

export default ForbiddenPage;
