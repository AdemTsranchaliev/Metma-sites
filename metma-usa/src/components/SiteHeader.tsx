"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, socialLinks } from "@/data/content";
import { SocialIcon } from "./Icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="border-b border-[#d6d6d6] py-2.5 min-[981px]:hidden">
        <ul className="flex items-center justify-center gap-2">
          {socialLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="flex h-8 w-8 items-center justify-center rounded-[3px] text-white"
                style={{ backgroundColor: item.color }}
              >
                <SocialIcon name={item.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto flex max-w-[1080px] items-center justify-center px-6 py-3.5">
        <button
          type="button"
          className="mx-auto text-[#7ebec5] min-[981px]:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((value) => !value)}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
            <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
          </svg>
        </button>

        <nav
          className={`${open ? "absolute inset-x-0 top-full block border-b border-[#eee] bg-white px-6 py-3 shadow-sm" : "hidden"} min-[981px]:static min-[981px]:block min-[981px]:border-0 min-[981px]:bg-transparent min-[981px]:p-0 min-[981px]:shadow-none`}
        >
          <ul className="flex flex-col items-center min-[981px]:flex-row">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith("/products") && link.href === "/products";
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      window.setTimeout(() => setOpen(false), 0);
                    }}
                    className={`block px-5 py-2.5 font-serif text-[21px] transition-[letter-spacing,color] duration-300 hover:tracking-[2px] ${
                      active ? "text-[#1e1e1e]" : "text-black/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
