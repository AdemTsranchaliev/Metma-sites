import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { SocialIcon } from "@/components/Icons";
import { contact, socialLinks } from "@/data/content";

export const metadata: Metadata = { title: "Contact" };

function officeLines(location: string) {
  const [street, city, state] = location.split(",").map((part) => part.trim());
  const pretty = (value: string) => value.toLowerCase().replace(/\b([a-z])/g, (letter) => letter.toUpperCase());
  if (!street) return [location];
  return [pretty(street), [city ? pretty(city) : "", state ? pretty(state) : ""].filter(Boolean).join(", ")];
}

const mapHref = "https://www.google.com/maps/search/?api=1&query=444+N+Northwest+Hwy+Ste+345+Park+Ridge+IL+60068";

export default function ContactPage() {
  const address = officeLines(contact.location);
  const cards = [
    { label: "Call", lines: [contact.phone], href: contact.phoneHref, color: "#e10600", external: false },
    { label: "Email", lines: [contact.email], href: `mailto:${contact.email}`, color: "#2f7de1", external: false },
    { label: "Office", lines: address, href: mapHref, color: "#1f9d62", external: true },
  ];

  return (
    <main>
      <section className="hero-wash">
        <div className="container-usa py-14 md:py-20">
          <p className="inline-flex rounded-full bg-[var(--usa-red)] px-3 py-1 text-[0.7rem] font-bold tracking-[0.18em] text-white uppercase">
            Contact
          </p>
          <h1 className="font-display mt-5 max-w-3xl text-5xl leading-[1.02] font-semibold text-[var(--usa-navy)] md:text-6xl">
            Write to the Park Ridge office.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--usa-mute)]">
            Orders, samples and questions for METMA USA LTD. We reply from Illinois.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-usa grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noreferrer" : undefined}
              className="rounded-[1.6rem] bg-[var(--usa-cream)] p-5 transition hover:-translate-y-0.5"
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase" style={{ color: card.color }}>
                <span className="h-2 w-2 rounded-full" style={{ background: card.color }} />
                {card.label}
              </span>
              <p className="font-display mt-3 text-2xl leading-snug text-[var(--usa-navy)]">
                {card.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </a>
          ))}
        </div>

        <div className="container-usa mt-12 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-[var(--usa-red)]">Message</p>
            <h2 className="font-display mt-3 text-4xl text-[var(--usa-navy)]">Tell us what you need.</h2>
            <p className="mt-4 max-w-sm leading-7 text-[var(--usa-mute)]">
              A name, an email and a short note are enough. The reply comes from {contact.email}.
            </p>
            <ul className="mt-6 flex gap-2" aria-label="Social">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--usa-sand)] text-[var(--usa-navy)] transition hover:bg-[var(--usa-navy)] hover:text-white"
                  >
                    <SocialIcon name={item.icon} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.8rem] bg-[var(--usa-cream)] p-5 sm:p-8">
            <InquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
