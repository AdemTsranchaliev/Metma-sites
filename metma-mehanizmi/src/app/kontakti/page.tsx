import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { PageHead } from "@/components/PageHead";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакти",
  description: `Контакти на ${siteConfig.legalName}: ${siteConfig.addressLines.join(", ")}. Телефон ${siteConfig.phone}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <PageHead
        eyebrow="Пазарджик"
        title="Контакти"
        lede="Наличности, серийни механизми и поръчки по заявка."
      />
      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <a href={siteConfig.mobileHref} className="display block text-4xl hover:text-brand sm:text-5xl">
            {siteConfig.mobile}
          </a>
          <div className="mt-8">
          <Info label="Адрес">
            <p>{siteConfig.addressLines[0]}</p>
            <p>{siteConfig.addressLines[1]}</p>
            <a
              href={siteConfig.mapHref}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-brand-deep hover:underline"
            >
              Отвори в карта
            </a>
          </Info>
          <Info label="Телефон">
            <a className="block hover:text-brand-deep" href={siteConfig.phoneHref}>
              {siteConfig.phone}
            </a>
            <a className="mt-1 block hover:text-brand-deep" href={siteConfig.mobileHref}>
              {siteConfig.mobile}
            </a>
          </Info>
          <Info label="Факс">
            <p>{siteConfig.fax}</p>
          </Info>
          <Info label="Имейл">
            <a className="hover:text-brand-deep" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </Info>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-line bg-foam px-6 py-8 sm:px-8">
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function Info({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-line py-4">
      <p className="eyebrow">{label}</p>
      <div className="mt-2 text-lg">{children}</div>
    </div>
  );
}
