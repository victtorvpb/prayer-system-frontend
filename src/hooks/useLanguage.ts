import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGE_KEY = "preferred_language";
const DEFAULT_LANGUAGE = "pt";

export function useLanguage() {
  const { i18n } = useTranslation();

  // Carrega o idioma salvo no localStorage ao iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      // Se não houver idioma salvo, usa português como padrão
      i18n.changeLanguage(DEFAULT_LANGUAGE);
      localStorage.setItem(LANGUAGE_KEY, DEFAULT_LANGUAGE);
    }
  }, [i18n]);

  // Função para mudar o idioma e salvar no localStorage
  const changeLanguage = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
      localStorage.setItem(LANGUAGE_KEY, language);
    },
    [i18n]
  );

  return {
    currentLanguage: i18n.language,
    changeLanguage,
  };
} 
