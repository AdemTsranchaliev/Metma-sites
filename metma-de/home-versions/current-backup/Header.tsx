"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, productCategories } from "@/data/home";

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
        <Link href="/" className="shrink-0" aria-label="METMA Startseite">
          <Image
            src="/images/logo.jpg"
            alt="METMA"
            width={150}
            height={45}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Hauptmenü"
        >
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
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
                    className="inline-flex bg-[var(--metma-rose)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--metma-rose-deep)]"
                  >
                    {item.label}
                  </Link>
                  {productsOpen && (
                    <div className="absolute left-0 top-full z-20 min-w-[168px] border border-[var(--metma-line)] bg-white py-1.5 shadow-sm">
                      {productCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="block px-3.5 py-2.5 text-sm text-[var(--metma-ink)] transition hover:bg-[var(--metma-sand)]"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? "text-[var(--metma-rose)]"
                    : "text-[var(--metma-ink)] hover:text-[var(--metma-rose)]"
                }`}
              >
                {item.label}
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
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-sm font-semibold ${
                      active ? "text-[var(--metma-rose)]" : "text-[var(--metma-ink)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {isProducts && (
                    <div className="mb-1 ml-1 flex flex-col border-l-2 border-[var(--metma-line)] pl-4">
                      {productCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setOpen(false)}
                          className="py-2 text-sm text-[var(--metma-mute)]"
                        >
                          {cat.label}
                        </Link>
                      ))}
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
