import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SocialIcon } from "@/components/SocialIcon";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { getMessages } from "@/i18n/messages";
import { getStatic } from "@/i18n/static";
import { localePath, parseLocale } from "@/lib/i18n";
import { siteConfig, socialProfiles } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const copy = getMessages(locale).meta;
  return pageMetadata({
    title: copy.contactTitle,
    description: copy.contactDescription,
    path: "/kontakti",
    locale,
  });
}

const phoneRows = [
  { key: "office" as const, display: siteConfig.phoneOffice, href: "tel:+35934443888" },
  { key: "mobile" as const, display: siteConfig.phone, href: `tel:${siteConfig.phoneE164}` },
  { key: "mobile" as const, display: siteConfig.phoneAlt, href: `tel:${siteConfig.phoneAltE164}` },
];

const mapQuery = encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}, България`,
);
const mapHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const copy = getMessages(locale);
  const ui = getStatic(locale).contact;
  const phones = phoneRows.map((row) => ({
    ...row,
    label: row.key === "office" ? ui.office : ui.mobile,
  }));
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: copy.meta.contactTitle,
          url: absoluteUrl(localePath(locale, "/kontakti")),
          mainEntity: {
            "@type": "Organization",
            name: siteConfig.name,
            email: siteConfig.email,
            telephone: [siteConfig.phoneOffice, siteConfig.phoneE164, siteConfig.phoneAltE164],
            address: {
              "@type": "PostalAddress",
              streetAddress: siteConfig.address.street,
              addressLocality: siteConfig.address.city,
              postalCode: siteConfig.address.postalCode,
              addressCountry: siteConfig.address.country,
            },
            sameAs: socialProfiles.map((item) => item.href),
          },
        }}
      />
      <PageIntro
        eyebrow={ui.eyebrow}
        title={ui.title}
        subtitle={ui.subtitle}
      />

      <section className="relative overflow-hidden bg-[#fff8f4] py-12 sm:py-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-full bg-[#ffd0bf] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-[#d6e6f4] blur-3xl"
        />

        <div className="container-metma relative grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <Reveal>
            <p className="eyebrow text-[var(--metma-rose)]">METMA ЕАД</p>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,4vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#2f3b4c]">
              {ui.find}
            </h2>

            <dl className="mt-7 space-y-3">
              <div className="rounded-[1.25rem] bg-white px-5 py-4">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                  {ui.address}
                </dt>
                <dd className="mt-1.5 text-base leading-7 text-[var(--metma-ink)]">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}, {ui.country}
                </dd>
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-[var(--metma-rose)] underline-offset-4 hover:underline"
                >
                  {ui.maps}
                </a>
              </div>

              <div className="rounded-[1.25rem] bg-white px-5 py-4">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                  {ui.phone}
                </dt>
                <dd className="mt-2 space-y-2">
                  {phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="flex items-baseline justify-between gap-4 text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
                    >
                      <span className="text-sm text-[var(--metma-mute)]">{phone.label}</span>
                      <span className="font-semibold">{phone.display}</span>
                    </a>
                  ))}
                </dd>
              </div>

              <div className="rounded-[1.25rem] bg-white px-5 py-4">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                  {ui.email}
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="break-all text-base font-semibold text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                {ui.social}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {socialProfiles.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 transition hover:bg-[var(--metma-rose)] hover:text-white"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--metma-sand)] text-[var(--metma-ink)]">
                        <SocialIcon id={item.id} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">{item.label}</span>
                        <span className="block truncate text-xs opacity-70">{item.handle}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={70}>
            <div className="rounded-[1.5rem] bg-white px-5 py-7 sm:px-8 sm:py-8">
              <p className="eyebrow text-[var(--metma-rose)]">{ui.message}</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
                {ui.write}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--metma-mute)]">
                {ui.writeText}
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="container-metma relative mt-10">
          <div className="overflow-hidden rounded-[1.5rem] bg-white">
            <iframe
              title={`${ui.mapTitle} — ${siteConfig.address.street}, ${siteConfig.address.city}`}
              src={`https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`}
              className="h-72 w-full border-0 sm:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
