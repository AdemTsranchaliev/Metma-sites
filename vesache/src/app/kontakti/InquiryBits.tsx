"use client";

import { useSearchParams } from "next/navigation";

export function InquiryNote() {
  const product = useSearchParams().get("produkt")?.trim();
  if (!product) return null;
  return <p className="mt-4 inline-flex rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-[var(--metma-rose-deep)]">Запитване за {product}</p>;
}

export function InquiryMail() {
  const product = useSearchParams().get("produkt")?.trim();
  const href = product ? `mailto:vessache@gmail.com?subject=${encodeURIComponent(`Запитване: ${product}`)}` : "mailto:vessache@gmail.com";

  return (
    <a
      href={href}
      aria-label={product ? `Пишете за ${product}` : "Пишете на vessache@gmail.com"}
      className="flex items-center gap-3 rounded-2xl bg-[#fff1c4] px-4 py-3.5 text-[var(--metma-ink)] shadow-[0_12px_28px_-18px_rgba(29,36,45,0.55)] transition duration-300 motion-safe:hover:-translate-y-0.5"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#8f5a00]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="m4.5 7 7.5 6L19.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#8f5a00]">Имейл</span>
        <span className="mt-0.5 block text-sm font-semibold">vessache@gmail.com</span>
      </span>
    </a>
  );
}
