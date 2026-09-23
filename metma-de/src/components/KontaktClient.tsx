"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { SectionScatter } from "@/components/easter/EasterScatter";
import { PageIntro } from "@/components/PageIntro";
import { EmailIcon, LocationIcon, PhoneIcon } from "@/components/icons";
import { partners, products as staticProducts } from "@/data/home";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { readProducts, type StoreProduct } from "@/lib/firebase/read";

const categoryLabels: Record<string, string> = {
  farbstoffe: "Farbstoffe",
  sets: "Sets",
  dekorationen: "Dekorationen",
};

type InquiryProduct = {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
};

function toInquiryProduct(
  p: Pick<InquiryProduct, "id" | "name" | "slug" | "image" | "category">,
): InquiryProduct {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    image: p.image,
    category: p.category,
  };
}

export function KontaktClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("produkt");
  const [product, setProduct] = useState<InquiryProduct | null>(() => {
    if (!slug) return null;
    const local = staticProducts.find((p) => p.slug === slug);
    return local ? toInquiryProduct(local) : null;
  });
  const [loadingProduct, setLoadingProduct] = useState(
    Boolean(slug && isFirebaseConfigured),
  );

  useEffect(() => {
    if (!slug) {
      setProduct(null);
      setLoadingProduct(false);
      return;
    }

    let cancelled = false;

    async function load() {
      const local = staticProducts.find((p) => p.slug === slug);
      if (local) {
        setProduct(toInquiryProduct(local));
      }

      if (!isFirebaseConfigured) {
        setLoadingProduct(false);
        return;
      }

      try {
        const list = await readProducts();
        if (cancelled) return;
        const fromFb = list.find((p: StoreProduct) => p.slug === slug);
        if (fromFb) {
          setProduct(toInquiryProduct(fromFb));
        } else if (!local) {
          setProduct(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoadingProduct(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const defaultSubject = product
    ? `Anfrage: ${product.name} (Art. ${product.id})`
    : "";

  const defaultMessage = product
    ? [
        `Hallo METMA,`,
        ``,
        `ich interessiere mich für folgendes Produkt:`,
        ``,
        `• ${product.name}`,
        `• Art.-Nr.: ${product.id}`,
        `• Kategorie: ${categoryLabels[product.category] ?? product.category}`,
        ``,
        `Bitte senden Sie mir weitere Informationen / ein Angebot.`,
        ``,
        `Mit freundlichen Grüßen`,
      ].join("\n")
    : "";

  return (
    <>
      <PageIntro
        eyebrow={product ? "Produktanfrage" : "Schreiben Sie uns"}
        title={product ? "Anfrage senden" : "Kontakt"}
        subtitle={
          product
            ? `Zu „${product.name}“ — Betreff und Nachricht sind bereits ausgefüllt.`
            : slug && loadingProduct
              ? "Produkt wird geladen…"
              : slug && !loadingProduct && !product
                ? "Produkt nicht gefunden — Sie können uns trotzdem schreiben."
                : "Fragen zu Sortiment, Displays oder Großhandel? Wir melden uns gerne."
        }
      />

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
            {product ? (
              <div className="mb-6 flex gap-4 border-2 border-[var(--metma-rose)] bg-white p-3 sm:p-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-white sm:h-24 sm:w-24">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                    sizes="96px"
                    unoptimized={product.image.startsWith("http")}
                  />
                </div>
                <div className="min-w-0 flex-1 self-center">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-rose)]">
                    Ausgewähltes Produkt
                  </p>
                  <p className="mt-1 font-display text-base font-bold leading-snug tracking-tight text-[var(--metma-ink)] sm:text-lg">
                    {product.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--metma-mute)]">
                    Art. {product.id}
                    {" · "}
                    {categoryLabels[product.category] ?? product.category}
                  </p>
                  <Link
                    href={`/produkte/${product.slug}`}
                    className="mt-2 inline-block text-xs font-semibold text-[var(--metma-ink)] underline-offset-4 hover:text-[var(--metma-rose)] hover:underline"
                  >
                    Produkt ansehen →
                  </Link>
                </div>
              </div>
            ) : null}

            <h2 className="font-display text-xl font-bold tracking-tight text-[var(--metma-ink)]">
              {product ? "Anfrage vervollständigen" : "Nachricht senden"}
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-[var(--metma-mute)]">
              {product
                ? "Name und E-Mail eintragen — der Rest ist schon für dieses Produkt vorbereitet."
                : "Schreiben Sie uns — wir antworten so schnell wie möglich."}
            </p>
            <div className="mt-5">
              <ContactForm
                key={product?.slug ?? "general"}
                defaultSubject={defaultSubject}
                defaultMessage={defaultMessage}
                productInquiry={Boolean(product)}
                product={product}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[var(--metma-line)] bg-[var(--metma-sand)] py-12 md:py-14">
        <SectionScatter variant="contact" />
        <div className="container-metma relative z-[1]">
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
              const subtitle = [
                partner.name !== partner.city ? partner.name : null,
                partner.detail || null,
              ]
                .filter(Boolean)
                .join(" · ");

              return (
                <li key={partner.name} className="bg-white px-5 py-5">
                  <div className="flex items-start gap-2.5">
                    <LocationIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--metma-rose)]" />
                    <div className="min-w-0">
                      <p className="font-display text-base font-bold text-[var(--metma-ink)]">
                        {partner.city}
                      </p>
                      {subtitle ? (
                        <p className="mt-0.5 text-sm text-[var(--metma-mute)]">
                          {subtitle}
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
