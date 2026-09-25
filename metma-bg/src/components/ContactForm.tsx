"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

const topics = ["Асортимент", "Дисплеи", "Едра поръчка", "Друго"] as const;

const fieldClass =
  "rounded-2xl border border-[var(--metma-line)] bg-[var(--metma-sand)] px-4 py-3 text-base font-normal outline-none focus:border-[var(--metma-rose)] focus:bg-white";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const topic = String(data.get("topic") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Запитване: ${topic} — ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n${name}\n${email}${phone ? `\n${phone}` : ""}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-1.5 text-sm font-semibold text-[var(--metma-ink)]">
        Име
        <input name="name" required autoComplete="name" className={fieldClass} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold text-[var(--metma-ink)]">
          Имейл
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-[var(--metma-ink)]">
          Телефон
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-semibold text-[var(--metma-ink)]">
        Тема
        <select name="topic" required defaultValue={topics[0]} className={fieldClass}>
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-[var(--metma-ink)]">
        Съобщение
        <textarea name="message" required rows={5} className={fieldClass} />
      </label>
      <button type="submit" className="btn-metma w-full sm:w-auto">
        Изпратете
      </button>
      <p className="text-sm leading-6 text-[var(--metma-mute)]">
        {sent
          ? `Пощата ви се отваря със съобщението към ${siteConfig.email}.`
          : "Съобщението се отваря в пощата ви — изпратете го оттам."}
      </p>
    </form>
  );
}
