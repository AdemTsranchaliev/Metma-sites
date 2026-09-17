import Link from "next/link";
import { navItems } from "@/data/home";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--metma-line)] bg-white">
      <div className="container-metma flex flex-col items-center gap-5 py-10 text-center">
        <p className="font-display text-xl font-bold text-[var(--metma-orange)]">
          METMA
        </p>
        <nav aria-label="Secondary navigation">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[var(--metma-mute)]">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-[var(--metma-orange)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-[#999]">
          © {year} Metma · Frohe Ostern
        </p>
      </div>
    </footer>
  );
}
