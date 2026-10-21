import Link from "next/link";

export function Logo({ href = "/", onDark = false }: { href?: string; onDark?: boolean }) {
  return (
    <Link href={href} aria-label="METMA USA" className="inline-flex items-center gap-2.5">
      <img src="/images/logo.webp" alt="" width={168} height={48} className="h-10 w-auto sm:h-11" />
      <span
        className={`rounded-full px-2 py-1 text-[0.65rem] font-bold tracking-[0.18em] ${
          onDark ? "bg-white text-[var(--usa-navy)]" : "bg-[var(--usa-navy)] text-white"
        }`}
      >
        USA
      </span>
    </Link>
  );
}
