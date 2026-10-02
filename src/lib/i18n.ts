import en from '../i18n/en';
import mr from '../i18n/mr';
import hi from '../i18n/hi';
import { Locale } from '../i18n/config';

const dictionaries = {
  en,
  mr,
  hi,
};

export const getDictionary = (locale: Locale) => dictionaries[locale] || dictionaries.en;
