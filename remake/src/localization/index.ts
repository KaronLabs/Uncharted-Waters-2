import { chineseCatalog, koreanCatalog } from './catalogs';

export { mergeCatalogs } from './catalogs';

export type Locale = 'zh-CN' | 'en' | 'ko-KR';

const storageKey = 'uw2.locale';
const listeners = new Set<() => void>();
let memoryLocale: Locale | undefined;
let useMemoryLocale = false;

const readStoredLocale = (): Locale => {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'en' || stored === 'zh-CN' || stored === 'ko-KR')
      return stored;
    return 'ko-KR';
  } catch {
    return 'ko-KR';
  }
};

export const getLocale = (): Locale =>
  useMemoryLocale && memoryLocale ? memoryLocale : readStoredLocale();

export const setLocale = (locale: Locale): void => {
  const changed = getLocale() !== locale;
  memoryLocale = locale;
  try {
    localStorage.setItem(storageKey, locale);
    useMemoryLocale = false;
  } catch {
    // The in-memory selection remains active when storage is unavailable.
    useMemoryLocale = true;
  }
  if (changed) listeners.forEach((listener) => listener());
};

export const subscribeLocale = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const localizeDocument = (): void => {
  const locale = getLocale();
  document.documentElement.lang = locale;
  const translatedNodes =
    document.querySelectorAll<HTMLElement>('[data-en][data-zh]');
  translatedNodes.forEach((element) => {
    let translated = element.dataset.en!;
    if (locale === 'zh-CN') {
      translated = element.dataset.zh!;
    } else if (locale === 'ko-KR') {
      const ko = element.getAttribute('data-ko');
      if (ko !== null) translated = ko;
    }
    Reflect.set(element, 'textContent', translated);
  });
  const localeOnlyNodes =
    document.querySelectorAll<HTMLElement>('[data-locale-only]');
  localeOnlyNodes.forEach((element) => {
    const hidden = element.dataset.localeOnly !== locale;
    Reflect.set(element, 'hidden', hidden);
  });
};

export const t = (
  source: string,
  values: Record<string, string | number> = {},
): string => {
  const locale = getLocale();
  let template = source; // English (default) or fallback
  if (locale === 'zh-CN') {
    template = Object.prototype.hasOwnProperty.call(chineseCatalog, source)
      ? chineseCatalog[source]
      : source;
  } else if (locale === 'ko-KR') {
    template = Object.prototype.hasOwnProperty.call(koreanCatalog, source)
      ? koreanCatalog[source]
      : source;
  }
  return template.replace(/\{([^}]+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(values, name)
      ? String(values[name])
      : match,
  );
};
