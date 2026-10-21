import Link from "next/link";
import { contact, socialLinks } from "@/data/content";
import { toneFor } from "@/lib/tones";
import { SocialIcon } from "./Icons";
import { Logo } from "./Logo";

const nav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { label: "Classic kits", href: "/products/classic", slug: "classic" },
  { label: "Children kits", href: "/products/children", slug: "children" },
  { label: "Display", href: "/products/display", slug: "display" },
  { label: "Egg decoration", href: "/products/decoration", slug: "decoration" },
];

function officeLines(location: string) {
  const [street, city, state] = location.split(",").map((part) => part.trim());
  const pretty = (value: string) => value.toLowerCase().replace(/\b([a-z])/g, (letter) => letter.toUpperCase());
  if (!street) return [location];
  return [pretty(street), [city ? pretty(city) : "", state ? pretty(state) : ""].filter(Boolean).join(", ")];
}

export function Footer() {
  const address = officeLines(contact.location);

  return (
    <footer className="bg-[var(--usa-navy)] text-white">
      <div className="color-bar" />
      <div className="container-usa py-10 md:py-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-sm">
            <Logo onDark />
            <p className="mt-3 text-sm leading-6 text-white/70">
              Easter egg dyes, coloring kits and decorations from Park Ridge, Illinois.
            </p>
          </div>
          <ul className="flex gap-2" aria-label="Social">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-[var(--usa-navy)]"
                >
                  <SocialIcon name={item.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-8 sm:grid-cols-4">
          <div>
            <p className="text-[0.68rem] font-bold tracking-[0.16em] text-white/50 uppercase">Explore</p>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm font-semibold hover:text-[var(--usa-gold)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.68rem] font-bold tracking-[0.16em] text-white/50 uppercase">The range</p>
            <ul className="mt-3 space-y-2">
              {categories.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[var(--usa-gold)]">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: toneFor(item.slug).chip }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <p className="text-[0.68rem] font-bold tracking-[0.16em] text-white/50 uppercase">Office</p>
            <p className="mt-3 text-sm leading-6 text-white/80">{address[0]}</p>
            {address[1] ? <p className="text-sm leading-6 text-white/80">{address[1]}</p> : null}
            <p className="mt-3 flex flex-col gap-1 text-sm font-semibold sm:flex-row sm:gap-4">
              <a href={`mailto:${contact.email}`} className="hover:text-[var(--usa-gold)]">
                {contact.email}
              </a>
              <a href={contact.phoneHref} className="hover:text-[var(--usa-gold)]">
                {contact.phone}
              </a>
            </p>
          </div>
        </div>

        <p className="mt-8 border-t border-white/15 pt-4 text-xs text-white/50">
          Copyright © {new Date().getFullYear()} METMA USA LTD.
        </p>
      </div>
    </footer>
  );
}
