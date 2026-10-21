"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { companies, type CatalogCategory } from "@/lib/types";

const links = [
  { label: "Начало", href: "/" },
  { label: "Продукти", href: "/produkti", children: true },
  { label: "За нас", href: "/za-nas" },
  { label: "Контакти", href: "/kontakti" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ categories }: { categories: CatalogCategory[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setCatsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-[var(--metma-line)] bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
      <div className="container-metma flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link href="/" aria-label="Весаче" className="flex items-center gap-2">
          <span className="relative block h-9 w-9 shrink-0">
            <Image src="/images/logo.png" alt="" fill priority className="object-contain" sizes="36px" />
          </span>
          <span className="font-display text-xl font-bold tracking-wide text-[var(--metma-rose)]">ВЕСАЧЕ</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Главно меню">
          {links.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setCatsOpen(true)}
                onMouseLeave={() => setCatsOpen(false)}
              >
                <Link
                  href={item.href}
                  className={`relative inline-flex h-9 items-center gap-1 px-3 text-sm ${
                    isActive(pathname, item.href) ? "font-semibold text-[var(--metma-rose)]" : "font-medium text-[var(--metma-ink)] hover:text-[var(--metma-rose)]"
                  }`}
                >
                  {item.label}
                  <span aria-hidden className="text-[0.6rem] opacity-70">▾</span>
                  {isActive(pathname, item.href) ? <span aria-hidden className="absolute inset-x-3 bottom-1 h-0.5 bg-[var(--metma-rose)]" /> : null}
                </Link>
                {catsOpen ? (
                  <div className="absolute left-0 top-full z-30 w-72 pt-2">
                    <div className="border border-[var(--metma-line)] bg-white py-2 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)]">
                      <div className="grid grid-cols-4 gap-1 px-3 pb-2">
                        {companies.map((company) => (
                          <Link
                            key={company.id}
                            href={`/produkti?firma=${company.id}`}
                            className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-center hover:bg-[var(--metma-sand)]"
                          >
                            <span className="relative block h-11 w-11 overflow-hidden rounded-full bg-white ring-1 ring-black/10">
                              <Image src={company.logo} alt="" fill className="object-contain p-1.5" sizes="44px" />
                            </span>
                            <span className="text-[0.65rem] font-bold leading-tight" style={{ color: company.ink }}>
                              {company.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-[var(--metma-line)] pt-1">
                        {categories.map((category) => (
                          <Link key={category.slug} href={`/produkti?kategoriya=${category.slug}`} className="block px-4 py-2.5 hover:bg-[var(--metma-sand)]">
                            <span className="block text-sm font-semibold">{category.label}</span>
                            <span className="mt-0.5 block text-xs text-[var(--metma-mute)]">{category.hint}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`relative inline-flex h-9 items-center px-3 text-sm ${
                  isActive(pathname, item.href) ? "font-semibold text-[var(--metma-rose)]" : "font-medium text-[var(--metma-ink)] hover:text-[var(--metma-rose)]"
                }`}
              >
                {item.label}
                {isActive(pathname, item.href) ? <span aria-hidden className="absolute inset-x-3 bottom-1 h-0.5 bg-[var(--metma-rose)]" /> : null}
              </Link>
            ),
          )}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={open ? "Затвори менюто" : "Отвори менюто"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden className="relative block h-3.5 w-5">
            <span className={`absolute left-0 block h-0.5 w-5 bg-[var(--metma-ink)] transition duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-[var(--metma-ink)] transition duration-200 ${open ? "scale-x-0 opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 block h-0.5 w-5 bg-[var(--metma-ink)] transition duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>
    </header>
      {open ? (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[calc(3.5rem+env(safe-area-inset-top))] z-40 overflow-y-auto overscroll-contain bg-white pb-[env(safe-area-inset-bottom)] sm:top-[calc(4rem+env(safe-area-inset-top))] md:hidden">
          <nav aria-label="Мобилно меню" className="container-metma flex flex-col pb-8 pt-1">
            {links.map((item) => {
              const active = isActive(pathname, item.href);
              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-14 items-center border-b border-[var(--metma-line)] text-base font-semibold ${
                      active ? "text-[var(--metma-rose)]" : "text-[var(--metma-ink)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.href} className="border-b border-[var(--metma-line)] py-2">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center text-base font-semibold ${active ? "text-[var(--metma-rose)]" : "text-[var(--metma-ink)]"}`}
                  >
                    {item.label}
                  </Link>
                  <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">Марки</p>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {companies.map((company) => (
                      <Link key={company.id} href={`/produkti?firma=${company.id}`} className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-2xl bg-[var(--metma-wash)] px-1 py-2">
                        <span className="relative block h-11 w-11 overflow-hidden rounded-full bg-white ring-1 ring-black/10">
                          <Image src={company.logo} alt="" fill className="object-contain p-1.5" sizes="44px" />
                        </span>
                        <span className="text-center text-[0.65rem] font-bold leading-tight" style={{ color: company.ink }}>
                          {company.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <p className="mt-4 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">Категории</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 pb-2">
                    {categories.map((category) => (
                      <Link key={category.slug} href={`/produkti?kategoriya=${category.slug}`} className="rounded-2xl bg-[var(--metma-sand)] px-3 py-3">
                        <span className="block text-sm font-semibold">{category.label}</span>
                        <span className="mt-0.5 block text-xs text-[var(--metma-mute)]">{category.hint}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
            <a href="tel:+35934443888" className="btn-metma mt-5 w-full">
              034 44 38 88
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
