"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { toneFor } from "@/lib/tones";
import { Logo } from "./Logo";

const links = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", children: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { label: "Classic kits", href: "/products/classic", slug: "classic", hint: "Tablets, cups and crayons" },
  { label: "Children kits", href: "/products/children", slug: "children", hint: "Stickers and characters" },
  { label: "Display", href: "/products/display", slug: "display", hint: "Shop-floor stand" },
  { label: "Egg decoration", href: "/products/decoration", slug: "decoration", hint: "Stamps, wraps and pens" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const menuId = useId();
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
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--usa-line)] bg-white/95 backdrop-blur-sm">
      <div className="container-usa flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((link) => {
            const current = isActive(pathname, link.href);
            if (!link.children) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`relative inline-flex h-10 items-center px-3 text-sm ${
                    current ? "font-semibold text-[var(--usa-red)]" : "font-medium text-[var(--usa-ink)] hover:text-[var(--usa-red)]"
                  }`}
                >
                  {link.label}
                  {current ? <span aria-hidden className="absolute inset-x-3 bottom-1 h-0.5 bg-[var(--usa-red)]" /> : null}
                </Link>
              );
            }

            return (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  aria-haspopup="true"
                  className={`relative inline-flex h-10 items-center gap-1 px-3 text-sm ${
                    current ? "font-semibold text-[var(--usa-red)]" : "font-medium text-[var(--usa-ink)] hover:text-[var(--usa-red)]"
                  }`}
                >
                  {link.label}
                  <span aria-hidden className="text-[0.6rem] opacity-70">
                    ▾
                  </span>
                  {current ? <span aria-hidden className="absolute inset-x-3 bottom-1 h-0.5 bg-[var(--usa-red)]" /> : null}
                </Link>
                <div className="absolute left-0 top-full z-30 hidden w-72 pt-2 group-hover:block group-focus-within:block">
                  <div className="overflow-hidden rounded-2xl border border-[var(--usa-line)] bg-white py-2 shadow-[0_16px_40px_-20px_rgba(12,35,64,0.45)]">
                    {categories.map((category) => {
                      const on = pathname === category.href;
                      const tone = toneFor(category.slug);
                      return (
                        <Link
                          key={category.href}
                          href={category.href}
                          aria-current={on ? "page" : undefined}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--usa-cream)]"
                          style={on ? { background: tone.bg } : undefined}
                        >
                          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: tone.chip }} />
                          <span>
                            <span className="block text-sm font-semibold" style={{ color: on ? tone.ink : undefined }}>
                              {category.label}
                            </span>
                            <span className="block text-xs text-[var(--usa-mute)]">{category.hint}</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-[var(--usa-navy)] transition duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-[var(--usa-navy)] transition duration-200 ${
                open ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-[var(--usa-navy)] transition duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>
      <div className="color-bar" />

      {open ? (
        <div id={menuId} className="max-h-[min(78vh,560px)] overflow-y-auto overscroll-contain bg-white md:hidden">
          <nav aria-label="Mobile" className="container-usa flex flex-col py-1">
            {links.map((link) => {
              const current = isActive(pathname, link.href);
              if (!link.children) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={`flex min-h-12 items-center border-b border-[var(--usa-line)] text-base font-semibold ${
                      current ? "text-[var(--usa-red)]" : "text-[var(--usa-navy)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <div key={link.href} className="border-b border-[var(--usa-line)]">
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      className={`flex min-h-12 flex-1 items-center text-base font-semibold ${
                        current ? "text-[var(--usa-red)]" : "text-[var(--usa-navy)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--usa-line)]"
                      aria-expanded={catsOpen}
                      aria-label={catsOpen ? "Hide categories" : "Show categories"}
                      onClick={() => setCatsOpen((value) => !value)}
                    >
                      <span aria-hidden className={`text-xs transition ${catsOpen ? "rotate-180" : ""}`}>
                        ▾
                      </span>
                    </button>
                  </div>
                  {catsOpen ? (
                    <div className="grid gap-1.5 pb-3">
                      {categories.map((category) => {
                        const on = pathname === category.href;
                        const tone = toneFor(category.slug);
                        return (
                          <Link
                            key={category.href}
                            href={category.href}
                            aria-current={on ? "page" : undefined}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                            style={{ background: tone.bg }}
                          >
                            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: tone.chip }} />
                            <span>
                              <span className="block text-sm font-semibold" style={{ color: tone.ink }}>
                                {category.label}
                              </span>
                              <span className="block text-xs text-[var(--usa-mute)]">{category.hint}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
