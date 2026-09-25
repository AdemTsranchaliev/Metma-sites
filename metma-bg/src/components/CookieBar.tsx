"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { getMessages } from "@/i18n/messages";

export function CookieBar() {
  const copy = getMessages(useLocale()).cookie;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem("metma-cookie-accepted");
    if (!accepted) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] max-w-sm border border-[var(--metma-line)] bg-white p-4 shadow-sm">
      <p className="text-sm leading-6 text-[var(--metma-mute)]">
        {copy.text}
      </p>
      <div className="mt-3 flex items-center justify-end gap-3">
        <button
          type="button"
          className="bg-[var(--metma-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
          onClick={() => {
            window.localStorage.setItem("metma-cookie-accepted", "1");
            setVisible(false);
          }}
        >
          {copy.accept}
        </button>
      </div>
    </div>
  );
}
