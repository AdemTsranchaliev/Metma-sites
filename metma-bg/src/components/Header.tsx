"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { getMessages } from "@/i18n/messages";
import { localeMeta, localePath, locales, stripLocale } from "@/lib/i18n";
import { menuContact } from "@/data/menu";

function isActivePath(pathname: string, href: string) {
  if (href === "/" || /^\/(en|de|fr|es|it)$/.test(href)) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const copy = getMessages(locale);
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const barePath = stripLocale(pathname);
  const menuNav = [
    { label: copy.nav.home, href: localePath(locale, "/") },
    { label: copy.nav.products, href: localePath(locale, "/produkti"), children: true },
    { label: copy.nav.blog, href: localePath(locale, "/blog") },
    { label: copy.nav.about, href: localePath(locale, "/za-nas") },
    { label: copy.nav.contact, href: localePath(locale, "/kontakti") },
  ];
  const menuCategories = [
    { label: copy.categories.boi.label, href: localePath(locale, "/produkti/boi"), hint: copy.categories.boi.hint },
    { label: copy.categories.komplekti.label, href: localePath(locale, "/produkti/komplekti"), hint: copy.categories.komplekti.hint },
    { label: copy.categories.ukrasi.label, href: localePath(locale, "/produkti/ukrasi"), hint: copy.categories.ukrasi.hint },
    { label: copy.categories.displei.label, href: localePath(locale, "/produkti/displei"), hint: copy.categories.displei.hint },
  ];

  useEffect(() => {
    setOpen(false);
    setCatsOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--metma-line)] bg-white/95 backdrop-blur-sm">
      <div className="container-metma flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href={localePath(locale, "/")}
          aria-label="METMA"
          className="relative block h-9 w-[8.75rem] shrink-0 sm:h-10 sm:w-[10rem]"
        >
          <Image
            src="/images/logo-brand-v3.png"
            alt="METMA"
            fill
            priority
            sizes="160px"
            className="object-contain object-left"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={copy.nav.menu}>
          {menuNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            const hasChildren = "children" in item && item.children;

            if (hasChildren) {
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-haspopup="true"
                    className={`relative inline-flex h-9 items-center gap-1 px-3 text-sm transition ${
                      active
                        ? "font-semibold text-[var(--metma-rose)]"
                        : "font-medium text-[var(--metma-ink)] hover:text-[var(--metma-rose)]"
                    }`}
                  >
                    {item.label}
                    <span aria-hidden className="text-[0.6rem] opacity-70">
                      ▾
                    </span>
                    {active ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-3 bottom-1 h-0.5 bg-[var(--metma-rose)]"
                      />
                    ) : null}
                  </Link>
                  <div className="absolute left-0 top-full z-30 hidden w-60 pt-2 group-hover:block group-focus-within:block">
                    <div className="border border-[var(--metma-line)] bg-white py-2 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)]">
                      {menuCategories.map((cat) => {
                        const catActive = isActivePath(pathname, cat.href);
                        return (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            aria-current={catActive ? "page" : undefined}
                            className={`block px-4 py-2.5 transition hover:bg-[var(--metma-sand)] ${
                              catActive ? "bg-[var(--metma-sand)]" : ""
                            }`}
                          >
                            <span
                              className={`block text-sm font-semibold ${
                                catActive
                                  ? "text-[var(--metma-rose)]"
                                  : "text-[var(--metma-ink)]"
                              }`}
                            >
                              {cat.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-[var(--metma-mute)]">
                              {cat.hint}
                            </span>
                          </Link>
                        );
                      })}
                      <div className="mt-1 border-t border-[var(--metma-line)] px-4 py-2.5">
                        <Link
                          href={localePath(locale, "/produkti")}
                          className="text-xs font-semibold text-[var(--metma-rose)] hover:underline"
                        >
                          {copy.nav.allProducts}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative inline-flex h-9 items-center px-3 text-sm transition ${
                  active
                    ? "font-semibold text-[var(--metma-rose)]"
                    : "font-medium text-[var(--metma-ink)] hover:text-[var(--metma-rose)]"
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 bottom-1 h-0.5 bg-[var(--metma-rose)]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="relative hidden md:block">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1 px-2 text-sm font-medium text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
            aria-expanded={langOpen}
            aria-haspopup="listbox"
            aria-label={copy.nav.language}
            onClick={() => setLangOpen((value) => !value)}
          >
            <span className="hidden sm:inline">{localeMeta[locale].label}</span>
            <span className="sm:hidden">{locale.toUpperCase()}</span>
            <span aria-hidden className={`text-[0.6rem] opacity-70 transition ${langOpen ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>
          {langOpen ? (
            <ul
              role="listbox"
              aria-label={copy.nav.language}
              className="absolute right-0 top-full z-40 mt-2 min-w-40 border border-[var(--metma-line)] bg-white py-1 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)]"
            >
              {locales.map((item) => (
                <li key={item}>
                  <Link
                    href={localePath(item, barePath)}
                    hrefLang={localeMeta[item].hreflang}
                    lang={localeMeta[item].htmlLang}
                    role="option"
                    aria-selected={item === locale}
                    className={`flex items-center justify-between px-3 py-2 text-sm ${
                      item === locale
                        ? "bg-[var(--metma-sand)] font-semibold text-[var(--metma-rose)]"
                        : "text-[var(--metma-ink)] hover:bg-[var(--metma-sand)]"
                    }`}
                    onClick={() => setLangOpen(false)}
                  >
                    {localeMeta[item].label}
                    <span className="text-[0.65rem] tracking-[0.08em] text-[var(--metma-mute)]">
                      {item.toUpperCase()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={open ? copy.nav.close : copy.nav.open}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{copy.nav.menu}</span>
          <span aria-hidden className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-[var(--metma-ink)] transition duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-[var(--metma-ink)] transition duration-200 ${
                open ? "scale-x-0 opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-[var(--metma-ink)] transition duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div
          id={menuId}
          className="border-t border-[var(--metma-line)] bg-white md:hidden"
        >
          <div className="max-h-[min(82vh,640px)] overflow-y-auto overscroll-contain">
            <nav aria-label={copy.nav.mobile} className="container-metma flex flex-col py-2">
              {menuNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                const hasChildren = "children" in item && item.children;

                if (hasChildren) {
                  return (
                    <div
                      key={item.href}
                      className="border-b border-[var(--metma-line)] py-2"
                    >
                      <div className="flex items-center gap-2">
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex min-h-12 flex-1 items-center text-base font-semibold ${
                            active ? "text-[var(--metma-rose)]" : "text-[var(--metma-ink)]"
                          }`}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--metma-line)]"
                          aria-expanded={catsOpen}
                          aria-label={catsOpen ? copy.nav.hideCategories : copy.nav.showCategories}
                          onClick={() => setCatsOpen((value) => !value)}
                        >
                          <span
                            aria-hidden
                            className={`text-xs transition ${catsOpen ? "rotate-180" : ""}`}
                          >
                            ▾
                          </span>
                        </button>
                      </div>
                      {catsOpen ? (
                        <div className="mt-2 grid gap-1">
                          {menuCategories.map((cat) => {
                            const catActive = isActivePath(pathname, cat.href);
                            return (
                              <Link
                                key={cat.href}
                                href={cat.href}
                                onClick={() => setOpen(false)}
                                aria-current={catActive ? "page" : undefined}
                                className={`rounded-md px-3 py-2.5 ${
                                  catActive
                                    ? "bg-[var(--metma-sand)]"
                                    : "bg-[var(--metma-sand)]/60"
                                }`}
                              >
                                <span
                                  className={`block text-sm font-semibold ${
                                    catActive
                                      ? "text-[var(--metma-rose)]"
                                      : "text-[var(--metma-ink)]"
                                  }`}
                                >
                                  {cat.label}
                                </span>
                                <span className="mt-0.5 block text-xs text-[var(--metma-mute)]">
                                  {cat.hint}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center justify-between border-b border-[var(--metma-line)] text-base font-semibold last:border-b-0 ${
                      active ? "text-[var(--metma-rose)]" : "text-[var(--metma-ink)]"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--metma-rose)]" />
                    ) : null}
                  </Link>
                );
              })}

              <ul aria-label={copy.nav.language} className="flex items-center gap-3 py-2">
                {locales.map((item) => (
                  <li key={item}>
                    <Link
                      href={localePath(item, barePath)}
                      hrefLang={localeMeta[item].hreflang}
                      lang={localeMeta[item].htmlLang}
                      aria-label={localeMeta[item].label}
                      aria-current={item === locale ? "true" : undefined}
                      onClick={() => setOpen(false)}
                      className={`text-[0.65rem] font-semibold tracking-[0.08em] ${
                        item === locale
                          ? "rounded-full bg-[var(--metma-rose)] px-1.5 py-0.5 text-white"
                          : "text-[var(--metma-mute)]"
                      }`}
                    >
                      {item.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 mb-5 flex flex-col gap-3 rounded-md bg-[var(--metma-sand)] px-4 py-4">
                <a
                  href={menuContact.phoneHref}
                  className="text-base font-semibold text-[var(--metma-ink)]"
                >
                  {menuContact.phone}
                </a>
                <a
                  href={menuContact.emailHref}
                  className="break-all text-sm text-[var(--metma-ink)]"
                >
                  {menuContact.email}
                </a>
                <Link href={localePath(locale, "/kontakti")} onClick={() => setOpen(false)} className="btn-metma w-full">
                  {copy.nav.send}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
