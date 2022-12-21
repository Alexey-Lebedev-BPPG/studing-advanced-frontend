import React from "react";
import { useTranslation } from "react-i18next";
import { BugButton } from "widgets/PageError";

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      {/* компонент для тестирования создания ошибки */}
      <BugButton />
      {t("Главная страница")}
    </div>
  );
};

export default MainPage;
