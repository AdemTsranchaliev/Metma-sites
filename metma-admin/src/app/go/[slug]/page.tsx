"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getQrLinkByCode } from "@/lib/api";
import type { SiteCode } from "@/lib/sites";

function normalizeSite(raw: string | null): SiteCode {
  if (raw === "Bg" || raw === "Usa" || raw === "De") return raw;
  return "De";
}

export default function GoPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const code = params.slug;
  const site = normalizeSite(searchParams.get("site"));
  const [status, setStatus] = useState<"loading" | "missing" | "ok">("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const link = await getQrLinkByCode(site, code);
      if (cancelled) return;

      const target = link?.redirectUrl?.trim();
      if (!target) {
        setStatus("missing");
        return;
      }

      setStatus("ok");
      window.location.replace(target);
    })();

    return () => {
      cancelled = true;
    };
  }, [site, code]);

  if (status === "missing") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[var(--admin-sand)] px-6 text-center">
        <p className="font-semibold text-[var(--admin-ink)]">Линкът не е намерен</p>
        <p className="text-sm text-[var(--admin-mute)]">
          QR кодът е невалиден или няма зададено пренасочване.
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--admin-sand)] px-6">
      <p className="text-sm text-[var(--admin-mute)]">Пренасочване…</p>
    </main>
  );
}
