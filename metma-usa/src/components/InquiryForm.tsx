"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { getDb, isFirebaseConfigured } from "@/lib/firebase/client";

const field =
  "rounded-2xl bg-white px-4 py-3 text-sm font-normal text-[var(--usa-ink)] shadow-[inset_0_0_0_1px_var(--usa-line)] outline-none placeholder:text-[var(--usa-mute)] focus:shadow-[inset_0_0_0_1px_var(--usa-navy)]";

export function InquiryForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    if (process.env.NEXT_PUBLIC_USE_FIREBASE === "true" && isFirebaseConfigured) {
      try {
        await addDoc(collection(getDb(), "inquiries"), {
          site: "Usa",
          name,
          email,
          message,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.error(err);
        setError("The message could not be saved. Please email sales@metma-usa.com.");
        return;
      }
    }

    setSent(true);
    form.reset();
  }

  if (sent) {
    return (
      <div className="rounded-3xl bg-white px-6 py-10 text-center">
        <p className="font-display text-3xl text-[var(--usa-navy)]">Thank you.</p>
        <p className="mt-2 text-[var(--usa-mute)]">We will reply from the Park Ridge office.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-1.5 text-sm font-semibold text-[var(--usa-navy)]">
        Name
        <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-[var(--usa-navy)]">
        Email
        <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-[var(--usa-navy)]">
        Message
        <textarea name="message" required rows={5} placeholder="Kits, quantities, or a question" className={field} />
      </label>
      {error ? <p className="text-sm text-[var(--usa-red)]">{error}</p> : null}
      <button type="submit" className="btn-usa w-full sm:w-fit">
        Send inquiry
      </button>
    </form>
  );
}
