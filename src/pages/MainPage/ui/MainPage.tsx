import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/shared/ui/Input/Input";
import Page from "@/widgets/Page/Page";
import { BugButton } from "@/widgets/PageError";

const MainPage: FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const onChange = (val: string) => setValue(val);

  return (
    <Page>
      {/* компонент для тестирования создания ошибки */}
      <BugButton />
      <Input value={value} onChange={onChange} placeholder="Введите текст" />
      {t("Главная страница")}
    </Page>
  );
};

export default MainPage;
