"use client";

import { FormEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { MagneticCta } from "@/components/MagneticCta";
import { getDb, isFirebaseConfigured } from "@/lib/firebase/client";

type Props = {
  defaultSubject?: string;
  defaultMessage?: string;
  productInquiry?: boolean;
  product?: {
    id: string;
    name: string;
    slug: string;
    image?: string;
    category?: string;
  } | null;
};

export function ContactForm({
  defaultSubject = "",
  defaultMessage = "",
  productInquiry = false,
  product = null,
}: Props) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("your-name") ?? "").trim();
    const email = String(data.get("your-email") ?? "").trim();
    const subject = String(data.get("your-subject") ?? "").trim();
    const message = String(data.get("your-message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Bitte Name, E-Mail und Nachricht ausfüllen.");
      setSending(false);
      return;
    }

    try {
      if (isFirebaseConfigured) {
        try {
          await addDoc(collection(getDb(), "inquiries"), {
            site: "De",
            name,
            email,
            subject: subject || null,
            message,
            productId: product?.id ?? null,
            productSlug: product?.slug ?? null,
            productName: product?.name ?? null,
            productCategory: product?.category ?? null,
            productImageUrl: product?.image ?? null,
            source: "kontakt",
            createdAt: serverTimestamp(),
          });
        } catch (storeErr) {
          console.error("Inquiry store failed", storeErr);
        }
      }

      const mailSubject = encodeURIComponent(
        subject || (product ? `Anfrage: ${product.name}` : "Kontaktanfrage METMA"),
      );
      const mailBody = encodeURIComponent(
        [
          message,
          "",
          "—",
          `Name: ${name}`,
          `E-Mail: ${email}`,
          product
            ? `Produkt: ${product.name} (Art. ${product.id})`
            : null,
          product ? `Slug: ${product.slug}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      );
      window.location.href = `mailto:sales@metma-de.com?subject=${mailSubject}&body=${mailBody}`;

      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      setError(
        "Senden fehlgeschlagen. Bitte erneut versuchen oder sales@metma-de.com schreiben.",
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-white px-5 py-8 text-center">
        <p className="font-display text-lg font-bold text-[var(--metma-ink)]">
          Danke!
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--metma-mute)]">
          Ihre Anfrage ist gespeichert. Wenn sich Ihr E-Mail-Programm geöffnet
          hat, senden Sie die Nachricht bitte noch ab — so erreichen Sie uns am
          schnellsten.
        </p>
      </div>
    );
  }

  const field =
    "w-full border border-[var(--metma-line)] bg-white px-4 py-3 text-[var(--metma-ink)] outline-none transition focus:border-[var(--metma-rose)]";
  const filledField =
    "w-full border-2 border-[var(--metma-rose)] bg-[var(--metma-peach)]/50 px-4 py-3 text-[var(--metma-ink)] outline-none transition focus:border-[var(--metma-rose)]";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {product ? (
        <input type="hidden" name="product-slug" value={product.slug} />
      ) : null}
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--metma-mute)]">
          Vollständiger Name
        </span>
        <input required name="your-name" autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--metma-mute)]">
          Ihre E-Mail
        </span>
        <input
          required
          type="email"
          name="your-email"
          autoComplete="email"
          className={field}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 flex flex-wrap items-center gap-2 text-sm font-medium text-[var(--metma-mute)]">
          Betreff
          {productInquiry ? (
            <span className="bg-[var(--metma-rose)] px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
              Vorausgefüllt
            </span>
          ) : null}
        </span>
        <input
          name="your-subject"
          defaultValue={defaultSubject}
          className={productInquiry ? filledField : field}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 flex flex-wrap items-center gap-2 text-sm font-medium text-[var(--metma-mute)]">
          Ihre Nachricht
          {productInquiry ? (
            <span className="bg-[var(--metma-rose)] px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
              Vorausgefüllt
            </span>
          ) : null}
        </span>
        <textarea
          name="your-message"
          rows={productInquiry ? 8 : 5}
          defaultValue={defaultMessage}
          required
          className={`${productInquiry ? filledField : field} resize-y`}
        />
      </label>
      {error ? (
        <p className="text-sm font-medium text-[var(--metma-rose)]">{error}</p>
      ) : null}
      <MagneticCta className="mt-1 w-full sm:w-auto">
        <button type="submit" className="btn-metma" disabled={sending}>
          {sending
            ? "Wird gesendet…"
            : productInquiry
              ? "Anfrage senden"
              : "Nachricht senden"}
        </button>
      </MagneticCta>
    </form>
  );
}
