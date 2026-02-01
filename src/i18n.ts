import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ptTranslations from './locales/pt.json';
import esTranslations from './locales/es.json';
import esMXTranslations from './locales/es-MX.json';
import esARTranslations from './locales/es-AR.json';
import esCOTranslations from './locales/es-CO.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            pt: { translation: ptTranslations },
            es: { translation: esTranslations },
            'es-MX': { translation: esMXTranslations },
            'es-AR': { translation: esARTranslations },
            'es-CO': { translation: esCOTranslations },
        },
        fallbackLng: 'pt',
        nonExplicitSupportedLngs: true,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['querystring', 'navigator', 'htmlTag', 'path', 'subdomain'],
            lookupQuerystring: 'lng',
            caches: ['localStorage', 'cookie'],
        },
    });

export default i18n;
