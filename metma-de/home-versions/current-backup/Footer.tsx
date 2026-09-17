import Link from "next/link";
import { navItems } from "@/data/home";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--metma-line)] bg-white">
      <div className="h-1 bg-[linear-gradient(90deg,var(--metma-rose),var(--metma-butter),var(--metma-mint),var(--metma-blue))]" />
      <div className="container-metma flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-xl font-bold tracking-tight text-[var(--metma-ink)]">
          METMA
        </p>
        <nav aria-label="Secondary navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--metma-mute)]">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--metma-rose)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-[var(--metma-mute)]">© {year}</p>
      </div>
    </footer>
  );
}
