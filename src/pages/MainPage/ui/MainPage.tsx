import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input";
import { BugButton } from "widgets/PageError";

const MainPage = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const onChange = (val: string) => setValue(val);

  return (
    <div>
      {/* компонент для тестирования создания ошибки */}
      <BugButton />
      <Input value={value} onChange={onChange} placeholder="Введите текст" />
      {t("Главная страница")}
    </div>
  );
};

export default MainPage;
