import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import Page from "@/widgets/Page/Page";
import cls from "./AdminPanelPage.module.scss";

export interface IAdminPanelPageProps {
  className?: string;
}

const AdminPanelPage: FC<IAdminPanelPageProps> = memo(({ className }) => {
  const { t } = useTranslation();

  return (
    <Page className={classNames(cls.adminPanelPage, {}, [className])}>
      {t("Админка")}
    </Page>
  );
});

export default AdminPanelPage;
