"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, productCategories } from "@/data/home";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md ${
        isHome
          ? "border-b border-white/15 bg-[rgba(47,109,176,0.72)] text-white"
          : "border-b border-[var(--metma-line)] bg-white/90 text-[var(--metma-ink)]"
      }`}
    >
      <div className="container-metma flex items-center justify-between gap-6 py-3.5">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.jpg"
            alt="METMA"
            width={180}
            height={54}
            priority
            className={`h-11 w-auto object-contain ${isHome ? "brightness-110" : ""}`}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Menu">
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
                    className="inline-flex bg-[var(--metma-ink)] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[var(--metma-orange)]"
                  >
                    {item.label}
                  </Link>
                  {productsOpen && (
                    <div className="absolute left-0 top-full z-20 min-w-[180px] border border-[#eee] bg-white py-2 text-[var(--metma-ink)] shadow-lg">
                      {productCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="block px-4 py-2 text-sm hover:bg-[#f7f7f7] hover:text-[var(--metma-orange)]"
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
                className={`px-3 py-2 text-[13px] font-medium uppercase tracking-[0.08em] transition ${
                  active
                    ? isHome
                      ? "text-[var(--metma-orange)]"
                      : "text-[var(--metma-orange)]"
                    : isHome
                      ? "text-white/85 hover:text-white"
                      : "text-[#333] hover:text-[var(--metma-orange)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={`inline-flex h-10 w-10 items-center justify-center border lg:hidden ${
            isHome ? "border-white/30" : "border-[#ddd]"
          }`}
          aria-label="Menü"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl leading-none">☰</span>
        </button>
      </div>

      {open && (
        <div
          className={`border-t lg:hidden ${
            isHome
              ? "border-white/10 bg-[rgba(47,109,176,0.96)]"
              : "border-[#eee] bg-white"
          }`}
        >
          <div className="container-metma flex flex-col py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-sm font-medium uppercase tracking-wide ${
                  "highlight" in item && item.highlight
                    ? "bg-[var(--metma-ink)] px-3 text-white"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
