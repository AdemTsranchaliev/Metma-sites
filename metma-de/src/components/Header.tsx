"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EasterInline } from "@/components/easter/EasterMotifs";
import { navItems, productCategories } from "@/data/home";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(true);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
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
    <header className="sticky top-0 z-50 border-b border-[var(--metma-line)] bg-white">
      <div className="container-metma flex h-14 items-center justify-between gap-3 sm:h-16 md:h-[4.25rem]">
        <div className="flex min-w-0 shrink items-center gap-2.5">
          <Link href="/" aria-label="METMA Startseite" className="shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="METMA"
              width={150}
              height={45}
              priority
              className="h-8 w-auto object-contain sm:h-9"
            />
          </Link>
          <EasterInline className="hidden sm:inline-flex" />
        </div>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Hauptmenü"
        >
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            const isProducts = item.label === "Produkte";

            if (isProducts) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[var(--metma-rose-deep)] text-white after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-[var(--metma-rose)]"
                        : "bg-[var(--metma-rose)] text-white hover:bg-[var(--metma-rose-deep)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {productsOpen && (
                    <div className="absolute left-0 top-full z-20 min-w-[168px] border border-[var(--metma-line)] bg-white py-1.5 shadow-sm">
                      {productCategories.map((cat) => {
                        const catActive = isActivePath(pathname, cat.href);
                        return (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            aria-current={catActive ? "page" : undefined}
                            className={`block px-3.5 py-2.5 text-sm transition hover:bg-[var(--metma-sand)] ${
                              catActive
                                ? "font-semibold text-[var(--metma-rose)]"
                                : "text-[var(--metma-ink)]"
                            }`}
                          >
                            {cat.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
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
                    className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-[var(--metma-rose)]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center text-[var(--metma-ink)] md:hidden"
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
                open ? "opacity-0" : "opacity-100"
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

      <div
        id="mobile-nav"
        className={`border-t border-[var(--metma-line)] bg-white md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="max-h-[min(78vh,560px)] overflow-y-auto overscroll-contain">
          <nav
            aria-label="Mobiles Menü"
            className="container-metma flex flex-col gap-1 py-3 pb-5"
          >
            {navItems.map((item) => {
              const isProducts = item.label === "Produkte";
              const active = isActivePath(pathname, item.href);

              if (isProducts) {
                return (
                  <div key={item.href} className="mt-1">
                    <div className="flex gap-2">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-12 flex-1 items-center justify-center px-4 text-sm font-semibold text-white transition ${
                          active
                            ? "bg-[var(--metma-rose-deep)]"
                            : "bg-[var(--metma-rose)]"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className="inline-flex min-h-12 w-12 items-center justify-center border border-[var(--metma-line)] text-[var(--metma-ink)]"
                        aria-expanded={mobileCatsOpen}
                        aria-label="Produktkategorien"
                        onClick={() => setMobileCatsOpen((v) => !v)}
                      >
                        <span
                          aria-hidden
                          className={`block text-lg leading-none transition ${
                            mobileCatsOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                    </div>
                    {mobileCatsOpen ? (
                      <div className="mt-1 grid grid-cols-1 gap-px bg-[var(--metma-line)]">
                        {productCategories.map((cat) => {
                          const catActive = isActivePath(pathname, cat.href);
                          return (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              onClick={() => setOpen(false)}
                              aria-current={catActive ? "page" : undefined}
                              className={`flex min-h-11 items-center bg-white px-4 text-sm ${
                                catActive
                                  ? "font-semibold text-[var(--metma-rose)]"
                                  : "text-[var(--metma-mute)]"
                              }`}
                            >
                              {cat.label}
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
                  className={`flex min-h-12 items-center justify-between border-l-[3px] px-3 text-[0.95rem] font-semibold transition ${
                    active
                      ? "border-[var(--metma-rose)] bg-[var(--metma-sand)] text-[var(--metma-rose)]"
                      : "border-transparent text-[var(--metma-ink)] active:bg-[var(--metma-sand)]"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em]">
                      Hier
                    </span>
                  ) : null}
                </Link>
              );
            })}

            <div className="mt-4 border-t border-[var(--metma-line)] pt-4">
              <EasterInline className="mb-3" />
              <a
                href="tel:+359885828771"
                className="block text-sm font-semibold text-[var(--metma-ink)]"
              >
                +359 885 828 771
              </a>
              <Link
                href="/kontakt"
                onClick={() => setOpen(false)}
                className="btn-outline mt-3 w-full"
              >
                Nachricht senden
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
