import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { ContactForm } from "./ContactForm";
import { InquiryMail, InquiryNote } from "./InquiryBits";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Весаче ЕАД — телефон, имейл и адрес в Пазарджик.",
};

const dyes = ["#e23b3b", "#f08a24", "#f2c31a", "#3dae4a", "#2f6fe0", "#7a4bb8", "#e45b9a"];

const mapsQuery = "бул. Ген. Гурко 6, Пазарджик";
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=16&hl=bg&output=embed&iwloc=near`;

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M8.2 4.8h2.1l1.1 2.8-1.6 1a11.2 11.2 0 0 0 5.6 5.6l1-1.6 2.8 1.1v2.1a1.8 1.8 0 0 1-2 1.8A13.2 13.2 0 0 1 6.4 6.8a1.8 1.8 0 0 1 1.8-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4.5 7 7.5 6L19.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Channel({
  href,
  label,
  children,
  icon,
  className,
  external,
}: {
  href: string;
  label: string;
  children: ReactNode;
  icon: ReactNode;
  className: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 shadow-[0_12px_28px_-18px_rgba(29,36,45,0.55)] transition duration-300 motion-safe:hover:-translate-y-0.5 ${className}`}
    >
      {icon}
      <span className="min-w-0">{children}</span>
    </a>
  );
}

export default function ContactPage() {
  return (
    <>
      <div className="flex h-1.5" aria-hidden>
        {dyes.map((color) => (
          <span key={color} className="flex-1" style={{ background: color }} />
        ))}
      </div>

      <section className="bg-[#eef5fd]">
        <div className="container-metma py-8 sm:py-10 lg:py-12">
          <p className="eyebrow text-[var(--metma-rose)]">Весаче ЕАД</p>
          <h1 className="mt-2 font-display text-[clamp(2.1rem,5vw,3rem)] font-bold leading-none tracking-[-0.04em]">Контакти</h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-[var(--metma-mute)]">Обадете се, пишете или елате на бул. Ген. Гурко в Пазарджик.</p>
          <Suspense fallback={null}>
            <InquiryNote />
          </Suspense>

          <div className="mt-6 grid items-start gap-3 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-5">
            <div className="grid gap-3">
              <Channel
                href="tel:+35934443888"
                label="Обадете се на 034 44 38 88"
                className="bg-[var(--metma-rose)] text-white"
                icon={
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
                    <PhoneIcon />
                  </span>
                }
              >
                <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/75">Телефон</span>
                <span className="mt-0.5 block font-display text-2xl font-bold leading-none tracking-[-0.03em]">034 44 38 88</span>
              </Channel>

              <Suspense
                fallback={
                  <Channel href="mailto:vessache@gmail.com" label="Пишете на vessache@gmail.com" className="bg-[#fff1c4] text-[var(--metma-ink)]" icon={
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#8f5a00]">
                      <MailIcon />
                    </span>
                  }>
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#8f5a00]">Имейл</span>
                    <span className="mt-0.5 block text-sm font-semibold">vessache@gmail.com</span>
                  </Channel>
                }
              >
                <InquiryMail />
              </Suspense>

              <Channel
                href={mapsHref}
                external
                label="Отворете адреса в Google Карти"
                className="bg-[#e4f6e6] text-[var(--metma-ink)]"
                icon={
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#1a7a34]">
                    <PinIcon />
                  </span>
                }
              >
                <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#1a7a34]">Адрес</span>
                <span className="mt-0.5 block text-sm font-semibold leading-snug">
                  бул. Ген. Гурко №6, ет. 3
                  <span className="block">4400 Пазарджик</span>
                </span>
              </Channel>
            </div>

            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>

            <div className="h-56 overflow-hidden rounded-[1.4rem] bg-white shadow-[0_12px_28px_-18px_rgba(29,36,45,0.55)] ring-1 ring-black/[0.04] lg:h-64">
              <iframe
                title="Карта до Весаче ЕАД, Пазарджик"
                src={mapsEmbed}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
