import Link from "next/link";
import { QrRedirect } from "@/components/QrRedirect";

export default function NotFound() {
  return (
    <QrRedirect>
      <main className="px-6 py-24 text-center">
        <p className="text-sm font-bold tracking-[0.16em] text-[var(--usa-red)] uppercase">404</p>
        <h1 className="mt-3 text-3xl font-bold text-[var(--usa-navy)]">Page not found</h1>
        <p className="mt-4 text-base text-[var(--usa-ink)]">This address does not exist.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-[var(--usa-red)] px-5 py-2.5 text-sm font-semibold text-white">
          Home
        </Link>
      </main>
    </QrRedirect>
  );
}
