
// lib/dictionary.ts
import { Locale } from '@/i18n-config';

// ✅ Page-specific dictionary paths
const pageDictionaries = {
  home: {
    en: () => import('@/dictionaries/home/en.json').then((m) => m.default),
    ru: () => import('@/dictionaries/home/ru.json').then((m) => m.default),
  },
  common: {
    en: () => import('@/dictionaries/common/en.json').then((m) => m.default),
    ru: () => import('@/dictionaries/common/ru.json').then((m) => m.default),

  },
} as const;

export type PageType = keyof typeof pageDictionaries;

// ✅ Get dictionary for specific page
export const getDictionary = async (locale: Locale, page: PageType) => {
  try {
    // Check if page exists
    if (!pageDictionaries[page]) {
      console.error(`Page "${page}" not found in dictionaries`);
      throw new Error(`Invalid page: ${page}`);
    }

    // Check if locale exists for this page
    if (!pageDictionaries[page][locale]) {
      console.warn(`Dictionary for ${page}/${locale} not found, falling back to en`);
      return await pageDictionaries[page].en();
    }

    return await pageDictionaries[page][locale]();
  } catch (error) {
    console.error(`Error loading dictionary for ${page}/${locale}:`, error);

    // Fallback to en if page exists
    if (pageDictionaries[page]) {
      return await pageDictionaries[page].en();
    }

    // Return empty object as last resort
    return {};
  }
};

// ✅ Get common dictionary (for navbar, footer, etc)
export const getCommonDictionary = async (locale: Locale) => {
  try {
    if (!pageDictionaries.common[locale]) {
      console.warn(`Common dictionary for ${locale} not found, falling back to en`);
      return pageDictionaries.common.en();
    }
    return await pageDictionaries.common[locale]();
  } catch (error) {
    console.error(`Error loading common dictionary for ${locale}:`, error);
    return pageDictionaries.common.en();
  }
};