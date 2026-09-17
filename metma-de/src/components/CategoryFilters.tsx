import Link from "next/link";

const cats = [
  { label: "Alle", href: "/produkte", slug: "alle" },
  { label: "Farbstoffe", href: "/produkte/farbstoffe", slug: "farbstoffe" },
  { label: "Sets", href: "/produkte/sets", slug: "sets" },
  {
    label: "Dekorationen",
    href: "/produkte/dekorationen",
    slug: "dekorationen",
  },
] as const;

type Props = {
  active?: string;
};

export function CategoryFilters({ active = "alle" }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {cats.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <Link
            key={cat.href}
            href={cat.href}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition sm:text-[0.8rem] ${
              isActive
                ? "bg-[var(--metma-rose)] text-white"
                : "text-[var(--metma-mute)] hover:bg-[var(--metma-sand)] hover:text-[var(--metma-ink)]"
            }`}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
