export const locales = ["bg", "en", "ro", "el", "lt", "lv", "et", "cs", "pl", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "bg";

export const localeMeta: Record<
  Locale,
  { label: string; htmlLang: string; og: string; hreflang: string }
> = {
  bg: { label: "Български", htmlLang: "bg", og: "bg_BG", hreflang: "bg" },
  en: { label: "English", htmlLang: "en", og: "en_US", hreflang: "en" },
  ro: { label: "Română", htmlLang: "ro", og: "ro_RO", hreflang: "ro" },
  el: { label: "Ελληνικά", htmlLang: "el", og: "el_GR", hreflang: "el" },
  lt: { label: "Lietuvių", htmlLang: "lt", og: "lt_LT", hreflang: "lt" },
  lv: { label: "Latviešu", htmlLang: "lv", og: "lv_LV", hreflang: "lv" },
  et: { label: "Eesti", htmlLang: "et", og: "et_EE", hreflang: "et" },
  cs: { label: "Čeština", htmlLang: "cs", og: "cs_CZ", hreflang: "cs" },
  pl: { label: "Polski", htmlLang: "pl", og: "pl_PL", hreflang: "pl" },
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
