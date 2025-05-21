import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationPT from './locales/pt/translation.json';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

const resources = {
  pt: {
    translation: translationPT,
  },
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 
