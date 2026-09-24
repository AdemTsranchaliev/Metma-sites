import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страницата не е намерена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-metma max-w-xl text-center">
        <p className="eyebrow text-[var(--metma-rose)]">404</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
          Страницата не е намерена
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--metma-mute)]">
          Този адрес не съществува. Върнете се към началото или към продуктите.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-metma">
            Начало
          </Link>
          <Link href="/produkti" className="btn-outline">
            Продукти
          </Link>
        </div>
      </div>
    </section>
  );
}
