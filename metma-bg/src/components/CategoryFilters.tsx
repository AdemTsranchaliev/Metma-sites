"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { getMessages } from "@/i18n/messages";
import { getStatic } from "@/i18n/static";
import { localePath } from "@/lib/i18n";

const slugs = [
  { slug: "alle", href: "/produkti" },
  { slug: "boi", href: "/produkti/boi" },
  { slug: "komplekti", href: "/produkti/komplekti" },
  { slug: "ukrasi", href: "/produkti/ukrasi" },
  { slug: "displei", href: "/produkti/displei" },
] as const;

type Props = {
  active?: string;
  brand?: string;
  ink?: string;
};

export function CategoryFilters({ active = "alle", brand = "all", ink }: Props) {
  const locale = useLocale();
  const copy = getMessages(locale);
  const all = getStatic(locale).catalog.all;
  const cats = slugs.map((cat) => ({
    ...cat,
    href: localePath(locale, cat.href),
    label: cat.slug === "alle" ? all : copy.categories[cat.slug].label,
  }));

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {cats.map((cat) => {
        const isActive = active === cat.slug;
        const href = brand !== "all" ? `${cat.href}?marka=${brand}` : cat.href;
        return (
          <Link
            key={cat.href}
            href={href}
            className={`border-b-2 pb-0.5 text-sm transition ${
              isActive ? "font-semibold" : "border-transparent text-[var(--metma-mute)] hover:text-[var(--metma-ink)]"
            }`}
            style={
              isActive
                ? { color: ink ?? "var(--metma-ink)", borderColor: ink ?? "var(--metma-ink)" }
                : undefined
            }
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
