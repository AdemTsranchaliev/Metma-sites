"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { nav, siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center px-5 sm:px-8">
        <Wordmark priority />
        <nav className="ml-12 hidden items-center gap-8 lg:flex" aria-label="Основно">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-[0.95rem] transition ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span className={active ? "border-b-2 border-brand pb-0.5" : ""}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto hidden items-center gap-6 lg:flex">
          <a
            href={siteConfig.mobileHref}
            className="text-sm tabular-nums text-muted transition hover:text-ink"
          >
            {siteConfig.mobile}
          </a>
          <Link href="/kontakti" className="btn">
            Запитване
          </Link>
        </div>
        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          <span className="sr-only">{open ? "Затвори менюто" : "Отвори менюто"}</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span className={`h-px bg-ink transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px bg-ink transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-paper px-5 py-6 lg:hidden"
          aria-label="Мобилно"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="display block py-2 text-4xl">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={siteConfig.mobileHref} className="mt-6 block text-sm tabular-nums text-muted">
            {siteConfig.mobile}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
