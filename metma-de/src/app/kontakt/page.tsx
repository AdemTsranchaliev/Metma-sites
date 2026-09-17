import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { EmailIcon, LocationIcon, PhoneIcon } from "@/components/icons";
import { partners } from "@/data/home";

export const metadata: Metadata = {
  title: "Kontakt – METMA Ltd. – Eierfarbe",
  description:
    "Kontaktieren Sie METMA — Adresse, Telefon und Nachricht für Sortiment, Displays und Großhandel.",
};

export default function KontaktPage() {
  return (
    <>
      <section className="border-b border-[var(--metma-line)] bg-[var(--metma-blue-soft)] py-10 md:py-12">
        <div className="container-metma">
          <p className="eyebrow text-[var(--metma-rose)]">Schreiben Sie uns</p>
          <h1 className="mt-2 font-display text-[clamp(2rem,4vw,2.9rem)] font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
            Kontakt
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-7 text-[var(--metma-mute)] md:text-base">
            Fragen zu Sortiment, Displays oder Großhandel? Wir melden uns gerne.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container-metma grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12">
          <div>
            <p className="eyebrow text-[var(--metma-rose)]">METMA</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--metma-ink)]">
              So erreichen Sie uns
            </h2>

            <dl className="mt-7 space-y-5">
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                  Adresse
                </dt>
                <dd className="mt-1.5 flex gap-2.5 text-base leading-7 text-[var(--metma-ink)]">
                  <LocationIcon className="mt-1 h-4 w-4 shrink-0 text-[var(--metma-rose)]" />
                  <span>
                    General Gurko 6, et. 3
                    <br />
                    Pazardzhik 4400, Bulgaria
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                  Telefon
                </dt>
                <dd className="mt-1.5 flex items-center gap-2.5">
                  <PhoneIcon className="h-4 w-4 shrink-0 text-[var(--metma-rose)]" />
                  <a
                    href="tel:+359885828771"
                    className="text-lg font-semibold text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
                  >
                    +359 885 828 771
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                  E-Mail
                </dt>
                <dd className="mt-1.5 flex items-center gap-2.5">
                  <EmailIcon className="h-4 w-4 shrink-0 text-[var(--metma-rose)]" />
                  <a
                    href="mailto:sales@metma-de.com"
                    className="text-base font-medium text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
                  >
                    sales@metma-de.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="bg-[var(--metma-sand)] px-5 py-7 sm:px-8 sm:py-8">
            <h2 className="font-display text-xl font-bold tracking-tight text-[var(--metma-ink)]">
              Nachricht senden
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-[var(--metma-mute)]">
              Schreiben Sie uns — wir antworten so schnell wie möglich.
            </p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--metma-line)] bg-[var(--metma-sand)] py-12 md:py-14">
        <div className="container-metma">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-[var(--metma-rose)]">Standorte</p>
              <h2 className="mt-2 font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold tracking-tight text-[var(--metma-ink)]">
                Vertriebspartner
              </h2>
            </div>
            <p className="text-sm text-[var(--metma-mute)]">
              {partners.length} Standorte in Bulgarien
            </p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => {
              const showName = partner.name !== partner.city;
              return (
                <li key={partner.name} className="bg-white px-5 py-5">
                  <div className="flex items-start gap-2.5">
                    <LocationIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--metma-rose)]" />
                    <div className="min-w-0">
                      <p className="font-display text-base font-bold text-[var(--metma-ink)]">
                        {partner.city}
                      </p>
                      {showName ? (
                        <p className="mt-0.5 text-sm text-[var(--metma-mute)]">
                          {partner.name}
                          {partner.detail ? ` · ${partner.detail}` : ""}
                        </p>
                      ) : partner.detail ? (
                        <p className="mt-0.5 text-sm text-[var(--metma-mute)]">
                          {partner.detail}
                        </p>
                      ) : null}
                      <div className="mt-3 space-y-1">
                        {partner.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="block text-sm font-medium text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
