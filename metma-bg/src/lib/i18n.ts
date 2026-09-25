export const locales = ["bg", "en", "de", "fr", "es", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "bg";

export const localeMeta: Record<
  Locale,
  { label: string; htmlLang: string; og: string; hreflang: string }
> = {
  bg: { label: "Български", htmlLang: "bg", og: "bg_BG", hreflang: "bg" },
  en: { label: "English", htmlLang: "en", og: "en_US", hreflang: "en" },
  de: { label: "Deutsch", htmlLang: "de", og: "de_DE", hreflang: "de" },
  fr: { label: "Français", htmlLang: "fr", og: "fr_FR", hreflang: "fr" },
  es: { label: "Español", htmlLang: "es", og: "es_ES", hreflang: "es" },
  it: { label: "Italiano", htmlLang: "it", og: "it_IT", hreflang: "it" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function parseLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function localeFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (segment && isLocale(segment) && segment !== defaultLocale) return segment;
  return defaultLocale;
}

export function stripLocale(pathname: string): string {
  const locale = localeFromPathname(pathname);
  if (locale === defaultLocale) return pathname || "/";
  const rest = pathname.slice(locale.length + 1);
  return rest.startsWith("/") ? rest : `/${rest}` || "/";
}
