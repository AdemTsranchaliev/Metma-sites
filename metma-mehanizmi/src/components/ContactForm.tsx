"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const product = useSearchParams().get("produkt") ?? undefined;
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = product
      ? `Запитване: ${product}`
      : "Запитване от сайта на МЕТМА";
    const body = [
      `Име: ${name}`,
      `Телефон: ${phone}`,
      `Имейл: ${email}`,
      "",
      message,
    ].join("\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Име
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="mt-2 w-full border-b border-line bg-transparent py-2 outline-none transition focus:border-brand"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            Телефон
          </label>
          <input
            id="phone"
            name="phone"
            required
            autoComplete="tel"
            className="mt-2 w-full border-b border-line bg-transparent py-2 outline-none transition focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Имейл
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full border-b border-line bg-transparent py-2 outline-none transition focus:border-brand"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Съобщение
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={
            product ? `Интересувам се от: ${product}` : undefined
          }
          className="mt-2 w-full border-b border-line bg-transparent py-2 outline-none transition focus:border-brand"
        />
      </div>
      <button
        type="submit"
        className="btn"
      >
        Изпрати запитване
      </button>
      {sent ? (
        <p className="text-sm text-muted">
          Отваря се пощенската ви програма с готово писмо до {siteConfig.email}.
        </p>
      ) : (
        <p className="text-sm text-muted">
          Писмото се подготвя към {siteConfig.email}. Може и директно на телефона.
        </p>
      )}
    </form>
  );
}
