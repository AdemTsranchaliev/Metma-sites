"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Запитване от ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-1.5 text-sm font-semibold text-[var(--metma-ink)]">
        Име
        <input
          name="name"
          required
          className="border border-[var(--metma-line)] bg-[var(--metma-sand)] px-4 py-3 text-base font-normal outline-none focus:border-[var(--metma-rose)] focus:bg-white"
        />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-[var(--metma-ink)]">
        Имейл
        <input
          name="email"
          type="email"
          required
          className="border border-[var(--metma-line)] bg-[var(--metma-sand)] px-4 py-3 text-base font-normal outline-none focus:border-[var(--metma-rose)] focus:bg-white"
        />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-[var(--metma-ink)]">
        Съобщение
        <textarea
          name="message"
          required
          rows={5}
          className="border border-[var(--metma-line)] bg-[var(--metma-sand)] px-4 py-3 text-base font-normal outline-none focus:border-[var(--metma-rose)] focus:bg-white"
        />
      </label>
      <button type="submit" className="btn-metma w-full sm:w-auto">
        Изпратете
      </button>
      {sent ? (
        <p className="text-sm text-[var(--metma-mute)]">
          Пощата ви се отваря със съобщението към {siteConfig.email}.
        </p>
      ) : null}
    </form>
  );
}
