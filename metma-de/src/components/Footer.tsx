import Image from "next/image";
import Link from "next/link";
import { navItems, productCategories } from "@/data/home";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--metma-line)] bg-white">
      <div className="h-0.5 bg-[var(--metma-rose)]" />

      <div className="container-metma py-10 md:py-12">
        <div className="grid gap-9 md:grid-cols-[1.1fr_0.9fr_0.9fr] md:gap-10">
          <div>
            <Link
              href="/"
              aria-label="METMA Startseite"
              className="relative inline-block h-9 w-[8.75rem] sm:h-10 sm:w-[10rem]"
            >
              <Image
                src="/images/logo-brand-v3.png"
                alt="METMA"
                fill
                sizes="160px"
                className="object-contain object-left"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--metma-mute)]">
              Eierfarben aus eigener Produktion — seit 1999.
            </p>
          </div>

          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
              Navigation
            </p>
            <ul className="mt-3 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
              Sortiment
            </p>
            <ul className="mt-3 space-y-2">
              {productCategories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm font-medium text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                Kontakt
              </p>
              <a
                href="tel:+359885828771"
                className="block text-sm font-semibold text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
              >
                +359 885 828 771
              </a>
              <a
                href="mailto:sales@metma-de.com"
                className="block break-all text-sm text-[var(--metma-mute)] transition hover:text-[var(--metma-rose)]"
              >
                sales@metma-de.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-[var(--metma-line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--metma-mute)]">
            © {year} METMA Ltd.
          </p>
          <Link
            href="/kontakt"
            className="text-xs font-semibold text-[var(--metma-ink)] underline-offset-4 transition hover:text-[var(--metma-rose)] hover:underline"
          >
            Nachricht senden →
          </Link>
        </div>
      </div>
    </footer>
  );
}
