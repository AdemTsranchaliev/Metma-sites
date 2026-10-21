"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { sendInquiry, type InquiryState } from "@/app/kontakti/actions";

const initial: InquiryState = { sent: false, error: "" };

const field =
  "mt-1.5 w-full rounded-2xl border border-black/10 bg-[#f7f9fc] px-4 py-3 text-sm text-[var(--metma-ink)] outline-none transition focus:border-[var(--metma-rose)]";

export function ContactForm() {
  const product = useSearchParams().get("produkt")?.trim() || undefined;
  const [state, setState] = useState(initial);
  const [pending, setPending] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });

  function setField(key: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    try {
      const result = await sendInquiry(state, new FormData(event.currentTarget));
      setState(result);
    } catch {
      setState({ sent: false, error: "Съобщението не тръгна. Опитайте отново или пишете на vessache@gmail.com." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form id="saobshtenie" onSubmit={onSubmit} className="relative rounded-[1.4rem] bg-white p-5 ring-1 ring-black/[0.05] sm:p-6">
      <p className="eyebrow text-[var(--metma-rose)]">Съобщение</p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em]">Изпратете запитване</h2>
      {product ? <p className="mt-2 text-sm font-semibold text-[var(--metma-rose-deep)]">За: {product}</p> : null}

      {state.sent ? (
        <p role="status" className="mt-5 rounded-2xl bg-[#e4f6e6] px-4 py-3 text-sm font-semibold text-[#1a7a34]">
          {state.openedMail
            ? "Отвори се пощата ви с готовото съобщение. Изпратете го оттам."
            : "Съобщението е изпратено. Ще отговорим на посочения имейл."}
        </p>
      ) : (
        <div className="mt-5 grid gap-4">
          <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              Уебсайт
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          {product ? <input type="hidden" name="product" value={product} /> : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              Име
              <input name="name" required autoComplete="name" maxLength={80} value={values.name} onChange={(event) => setField("name", event.target.value)} className={field} />
            </label>
            <label className="block text-sm font-semibold">
              Имейл
              <input name="email" type="email" required autoComplete="email" maxLength={120} value={values.email} onChange={(event) => setField("email", event.target.value)} className={field} />
            </label>
          </div>

          <label className="block text-sm font-semibold">
            Телефон
            <input name="phone" type="tel" autoComplete="tel" maxLength={30} value={values.phone} onChange={(event) => setField("phone", event.target.value)} className={field} />
          </label>

          <label className="block text-sm font-semibold">
            Съобщение
            <textarea name="message" required rows={4} maxLength={4000} value={values.message} onChange={(event) => setField("message", event.target.value)} className={`${field} resize-y`} />
          </label>

          {state.error ? (
            <p role="alert" className="text-sm font-semibold text-[#c41212]">
              {state.error}
            </p>
          ) : null}

          <button type="submit" disabled={pending} className="btn-metma w-full px-6 disabled:opacity-60 sm:w-fit">
            {pending ? "Изпраща се…" : "Изпратете"}
          </button>
        </div>
      )}
    </form>
  );
}
