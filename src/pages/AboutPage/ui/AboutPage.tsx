import React from "react";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  // в хук можем передать только тот файл перевода, который нам необходим
  const { t } = useTranslation("about");
  return <div>{t("О сайте")}</div>;
};

export default AboutPage;
