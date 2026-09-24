import Link from "next/link";

const cats = [
  { label: "Всички", href: "/produkti", slug: "alle" },
  { label: "Бои", href: "/produkti/boi", slug: "boi" },
  { label: "Комплекти", href: "/produkti/komplekti", slug: "komplekti" },
  { label: "Украси", href: "/produkti/ukrasi", slug: "ukrasi" },
  { label: "Дисплеи", href: "/produkti/displei", slug: "displei" },
] as const;

type Props = {
  active?: string;
  brand?: string;
  ink?: string;
};

export function CategoryFilters({ active = "alle", brand = "all", ink }: Props) {
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
