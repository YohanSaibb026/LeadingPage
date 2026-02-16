import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ptTranslations from './locales/pt.json';
import esTranslations from './locales/es.json';
import esARTranslations from './locales/es-AR.json';
import esMXTranslations from './locales/es-MX.json';
import esCOTranslations from './locales/es-CO.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            pt: { translation: ptTranslations },
            es: { translation: esTranslations },
            'es-AR': { translation: esARTranslations },
            'es-MX': { translation: esMXTranslations },
            'es-CO': { translation: esCOTranslations },
        },
        fallbackLng: {
            'es-UY': ['es-AR'],
            'es-CL': ['es-AR'],
            'pt': ['pt'],
            default: ['es-CO'],
        },
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['querystring', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage', 'cookie'],
        },
    });

export default i18n;
