import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import English from './locales/en/translation.json'
import German from './locales/de/translation.json'

await i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        translation: {
          ...English,
        },
      },
      de: {
        translation: {
          ...German,
        },
      },
    },
  })

export default i18n
