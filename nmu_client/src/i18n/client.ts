'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import kk from './locales/kk/common.json'
import ru from './locales/ru/common.json'

void i18n.use(initReactI18next).init({
	resources: {
		ru: { common: ru },
		kk: { common: kk },
	},
	lng: 'ru',
	fallbackLng: 'ru',
	interpolation: { escapeValue: false },
})

export default i18n
