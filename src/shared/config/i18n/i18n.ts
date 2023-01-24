import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // подключаем плагины
  // чтоб переводы подключались чанками
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // язык по ум.
    fallbackLng: "ru",
    // чтоб в консоли показывало данные библиотеки
    // eslint-disable-next-line no-undef
    debug: __IS_DEV_DEBUG__,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // уазываем откуда тянуть переводы
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
