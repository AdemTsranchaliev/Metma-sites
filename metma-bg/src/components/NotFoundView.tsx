"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMessages } from "@/i18n/messages";
import { getStatic } from "@/i18n/static";
import { localeFromPathname, localePath } from "@/lib/i18n";

export function NotFoundView() {
  const locale = localeFromPathname(usePathname() || "/");
  const copy = getMessages(locale);
  const text = getStatic(locale).notFound.text;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-metma max-w-xl text-center">
        <p className="eyebrow text-[var(--metma-rose)]">404</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
          {copy.meta.notFoundTitle}
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--metma-mute)]">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={localePath(locale, "/")} className="btn-metma">
            {copy.nav.home}
          </Link>
          <Link href={localePath(locale, "/produkti")} className="btn-outline">
            {copy.nav.products}
          </Link>
        </div>
      </div>
    </section>
  );
}
