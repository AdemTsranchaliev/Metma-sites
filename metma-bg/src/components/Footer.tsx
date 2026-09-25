import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/components/SocialIcon";
import { getMessages } from "@/i18n/messages";
import { localeMeta, localePath, locales, type Locale } from "@/lib/i18n";
import { siteConfig, socialProfiles } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const copy = getMessages(locale);
  const nav = [
    { label: copy.nav.home, href: localePath(locale, "/") },
    { label: copy.nav.products, href: localePath(locale, "/produkti") },
    { label: copy.nav.blog, href: localePath(locale, "/blog") },
    { label: copy.nav.about, href: localePath(locale, "/za-nas") },
    { label: copy.footer.declarations, href: localePath(locale, "/deklaratsii") },
    { label: copy.nav.contact, href: localePath(locale, "/kontakti") },
  ];
  const categories = [
    { label: copy.categories.boi.label, href: localePath(locale, "/produkti/boi") },
    { label: copy.categories.komplekti.label, href: localePath(locale, "/produkti/komplekti") },
    { label: copy.categories.ukrasi.label, href: localePath(locale, "/produkti/ukrasi") },
    { label: copy.categories.displei.label, href: localePath(locale, "/produkti/displei") },
  ];

  return (
    <footer className="border-t border-[var(--metma-line)] bg-white">
      <div className="h-0.5 bg-[var(--metma-rose)]" />

      <div className="container-metma py-10 md:py-12">
        <div className="grid gap-9 md:grid-cols-[1.1fr_0.9fr_0.9fr] md:gap-10">
          <div>
            <Link
              href={localePath(locale, "/")}
              aria-label="METMA"
              className="relative inline-block h-9 w-[8.75rem] sm:h-10 sm:w-[10rem]"
            >
              <Image
                src="/images/logo-brand-v3.png"
                alt="METMA"
                fill
                sizes="160px"
                className="object-contain object-left"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--metma-mute)]">
              {copy.footer.blurb}
            </p>
          </div>

          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
              {copy.footer.navigation}
            </p>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
              {copy.footer.range}
            </p>
            <ul className="mt-3 space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm font-medium text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                {copy.footer.contact}
              </p>
              <a
                href={`tel:${siteConfig.phoneE164}`}
                className="block text-sm font-semibold text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`tel:${siteConfig.phoneAltE164}`}
                className="block text-sm font-semibold text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
              >
                {siteConfig.phoneAlt}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block break-all text-sm text-[var(--metma-mute)] transition hover:text-[var(--metma-rose)]"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-[var(--metma-line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--metma-mute)]">
            © {year} {siteConfig.legalName}
          </p>
          <nav aria-label={copy.nav.language} className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:gap-3">
            {locales.map((item) => (
              <Link
                key={item}
                href={localePath(item, "/")}
                hrefLang={localeMeta[item].hreflang}
                lang={localeMeta[item].htmlLang}
                className={`text-xs font-semibold ${
                  item === locale ? "text-[var(--metma-rose)]" : "text-[var(--metma-ink)]"
                }`}
              >
                {localeMeta[item].label}
              </Link>
            ))}
          </nav>
          <Link
            href={localePath(locale, "/kontakti")}
            className="text-xs font-semibold text-[var(--metma-ink)] underline-offset-4 transition hover:text-[var(--metma-rose)] hover:underline"
          >
            {copy.footer.send}
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[var(--metma-ink)] text-white">
        <div className="container-metma flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/70">
            {copy.footer.follow}
          </p>
          <ul className="flex items-center gap-2">
            {socialProfiles.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[var(--metma-rose)]"
                >
                  <SocialIcon id={item.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
