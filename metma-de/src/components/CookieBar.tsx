"use client";

import { useEffect, useState } from "react";

export function CookieBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem("metma-cookie-accepted");
    if (!accepted) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] max-w-sm border border-[var(--metma-line)] bg-white p-4 shadow-sm">
      <p className="text-sm leading-6 text-[var(--metma-mute)]">
        Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern.
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          className="text-xs text-[var(--metma-mute)] underline"
          onClick={() => setVisible(false)}
        >
          Einstellungen
        </button>
        <button
          type="button"
          className="bg-[var(--metma-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
          onClick={() => {
            window.localStorage.setItem("metma-cookie-accepted", "1");
            setVisible(false);
          }}
        >
          Akzeptieren
        </button>
      </div>
    </div>
  );
}
