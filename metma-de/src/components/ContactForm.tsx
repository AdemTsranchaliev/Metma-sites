"use client";

import { FormEvent, useState } from "react";
import { MagneticCta } from "@/components/MagneticCta";

type Props = {
  defaultSubject?: string;
  defaultMessage?: string;
  productInquiry?: boolean;
};

export function ContactForm({
  defaultSubject = "",
  defaultMessage = "",
  productInquiry = false,
}: Props) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="bg-white px-5 py-8 text-center">
        <p className="font-display text-lg font-bold text-[var(--metma-ink)]">
          Danke!
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--metma-mute)]">
          Ihre Nachricht wurde vorbereitet. Die API-Anbindung folgt als
          Nächstes.
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
          className={`${productInquiry ? filledField : field} resize-y`}
        />
      </label>
      <MagneticCta className="mt-1 w-full sm:w-auto">
        <button type="submit" className="btn-metma">
          {productInquiry ? "Anfrage senden" : "Nachricht senden"}
        </button>
      </MagneticCta>
    </form>
  );
}
