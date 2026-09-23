import type { Metadata } from "next";
import { Suspense } from "react";
import { KontaktClient } from "@/components/KontaktClient";

export const metadata: Metadata = {
  title: "Kontakt – METMA Ltd. – Eierfarbe",
  description:
    "Kontaktieren Sie METMA — Adresse, Telefon und Nachricht für Sortiment, Displays und Großhandel.",
};

export default function KontaktPage() {
  return (
    <Suspense fallback={null}>
      <KontaktClient />
    </Suspense>
  );
}
