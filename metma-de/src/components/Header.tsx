"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { menuCategories, menuContact, menuNav } from "@/data/menu";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [desktopCats, setDesktopCats] = useState(false);

  useEffect(() => {
    setOpen(false);
    setDesktopCats(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--metma-line)] bg-white/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="container-metma flex h-14 items-center justify-between gap-4 sm:h-16 md:h-[4.25rem]">
        <Link
          href="/"
          aria-label="METMA Startseite"
          className="relative block h-8 w-[6.75rem] shrink-0 sm:h-9 sm:w-[7.6rem]"
        >
          <Image
            src="/images/logo-mark.png"
            alt="METMA"
            fill
            priority
            sizes="122px"
            className="object-contain object-left"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Hauptmenü"
        >
          {menuNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            const hasChildren = "children" in item && item.children;

            if (hasChildren) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setDesktopCats(true)}
                  onMouseLeave={() => setDesktopCats(false)}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="btn-metma inline-flex !px-4 !py-2 text-sm"
                  >
                    {item.label}
                    <span aria-hidden className="ml-1 text-[0.65rem] opacity-80">
                      ▾
                    </span>
                  </Link>

                  {desktopCats ? (
                    <div className="absolute left-0 top-full z-30 min-w-[240px] border border-[var(--metma-line)] bg-white py-2 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)]">
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
                          href="/produkte"
                          className="text-xs font-semibold text-[var(--metma-rose)] hover:underline"
                        >
                          Alle Produkte →
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3.5 py-2 text-sm transition ${
                  active
                    ? "font-semibold text-[var(--metma-rose)]"
                    : "font-medium text-[var(--metma-ink)] hover:text-[var(--metma-rose)]"
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-3.5 bottom-0 h-0.5 bg-[var(--metma-rose)]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menü</span>
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

      {/* Mobile panel */}
      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[var(--metma-line)] bg-white md:hidden"
        >
          <div className="max-h-[min(82vh,640px)] overflow-y-auto overscroll-contain">
            <nav
              aria-label="Mobiles Menü"
              className="container-metma flex flex-col py-2"
            >
              {menuNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                const hasChildren = "children" in item && item.children;

                return (
                  <div
                    key={item.href}
                    className="border-b border-[var(--metma-line)] last:border-b-0"
                  >
                    {hasChildren ? (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="btn-metma my-3 w-full"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-[3.25rem] items-center justify-between text-[1.05rem] font-semibold ${
                          active
                            ? "text-[var(--metma-rose)]"
                            : "text-[var(--metma-ink)]"
                        }`}
                      >
                        {item.label}
                        {active ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--metma-rose)]" />
                        ) : null}
                      </Link>
                    )}

                    {hasChildren ? (
                      <div className="mb-3 grid gap-1 pb-1">
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
              })}

              <div className="mt-4 mb-5 space-y-3 rounded-md bg-[var(--metma-sand)] px-4 py-4">
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-mute)]">
                    Telefon
                  </p>
                  <a
                    href={menuContact.phoneHref}
                    className="mt-1 block text-base font-semibold text-[var(--metma-ink)]"
                  >
                    {menuContact.phone}
                  </a>
                </div>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-mute)]">
                    E-Mail
                  </p>
                  <a
                    href={menuContact.emailHref}
                    className="mt-1 block break-all text-sm text-[var(--metma-ink)]"
                  >
                    {menuContact.email}
                  </a>
                </div>
                <Link
                  href="/kontakt"
                  onClick={() => setOpen(false)}
                  className="btn-metma mt-1 w-full"
                >
                  Nachricht senden
                </Link>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
