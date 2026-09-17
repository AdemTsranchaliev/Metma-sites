"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
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
        <span className="mb-1.5 block text-sm font-medium text-[var(--metma-mute)]">
          Betreff
        </span>
        <input name="your-subject" className={field} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--metma-mute)]">
          Ihre Nachricht
        </span>
        <textarea
          name="your-message"
          rows={5}
          className={`${field} resize-y`}
        />
      </label>
      <button type="submit" className="btn-metma mt-1 w-full sm:w-auto">
        Nachricht senden
      </button>
    </form>
  );
}
