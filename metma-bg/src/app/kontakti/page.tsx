import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/PageIntro";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Контакти",
  description:
    "Свържете се с METMA — телефон, имейл и адрес в Пазарджик. Запитвания за бои, комплекти и дисплеи.",
  path: "/kontakti",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Контакт"
        title="Контакти"
        subtitle="Изпратете ни съобщение и ние ще се свържем с вас."
      />
      <section className="bg-white py-12 md:py-16">
        <div className="container-metma grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6 text-sm leading-7 text-[var(--metma-mute)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--metma-ink)]">Адрес</p>
              <p className="mt-2">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}, България
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--metma-ink)]">Телефон</p>
              <a className="mt-2 block font-semibold text-[var(--metma-ink)] hover:text-[var(--metma-rose)]" href={`tel:${siteConfig.phoneE164}`}>
                {siteConfig.phone}
              </a>
              <a className="block font-semibold text-[var(--metma-ink)] hover:text-[var(--metma-rose)]" href={`tel:${siteConfig.phoneAltE164}`}>
                {siteConfig.phoneAlt}
              </a>
              <a className="block hover:text-[var(--metma-rose)]" href="tel:+35934443888">
                {siteConfig.phoneOffice}
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--metma-ink)]">Имейл</p>
              <a className="mt-2 block font-semibold text-[var(--metma-ink)] hover:text-[var(--metma-rose)]" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
