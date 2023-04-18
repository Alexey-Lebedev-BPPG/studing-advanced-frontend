import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// конфиг переводов специально для тестов
i18n.use(initReactI18next).init({
  lng: 'ru',
  fallbackLng: 'ru',
  debug: false,
  returnNull: false,
  interpolation: {
    escapeValue: false,
  },
  resources: { ru: { translations: {} } },
});

export default i18n;
