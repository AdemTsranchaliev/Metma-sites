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

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--metma-line)] bg-white">
      <div className="container-metma flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
        <div className="flex shrink-0 items-center gap-3">
          <Link href="/" aria-label="METMA Startseite">
            <Image
              src="/images/logo.jpg"
              alt="METMA"
              width={150}
              height={45}
              priority
              className="h-9 w-auto object-contain"
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
          className="inline-flex h-10 w-10 items-center justify-center border border-[var(--metma-line)] text-[var(--metma-ink)] md:hidden"
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menü</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            {open ? (
              <span className="text-xl leading-none">×</span>
            ) : (
              <>
                <span className="block h-0.5 w-5 bg-[var(--metma-ink)]" />
                <span className="block h-0.5 w-5 bg-[var(--metma-ink)]" />
                <span className="block h-0.5 w-5 bg-[var(--metma-ink)]" />
              </>
            )}
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--metma-line)] bg-white md:hidden">
          <div className="container-metma flex flex-col py-2 pb-4">
            {navItems.map((item) => {
              const isProducts = item.label === "Produkte";
              const active = isActivePath(pathname, item.href);

              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between border-l-2 py-3 pl-3 text-sm font-semibold transition ${
                      active
                        ? "border-[var(--metma-rose)] text-[var(--metma-rose)]"
                        : "border-transparent text-[var(--metma-ink)]"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--metma-rose)]">
                        Aktiv
                      </span>
                    ) : null}
                  </Link>
                  {isProducts && (
                    <div className="mb-1 ml-1 flex flex-col border-l-2 border-[var(--metma-line)] pl-4">
                      {productCategories.map((cat) => {
                        const catActive = isActivePath(pathname, cat.href);
                        return (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            onClick={() => setOpen(false)}
                            aria-current={catActive ? "page" : undefined}
                            className={`py-2 text-sm ${
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
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
