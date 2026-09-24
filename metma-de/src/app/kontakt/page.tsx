import type { Metadata } from "next";
import { Suspense } from "react";
import { KontaktClient } from "@/components/KontaktClient";

import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Kontakt zu METMA: Adresse in Pazardzhik, Telefon und Anfrage für Sortiment, Displays und Großhandel.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <Suspense fallback={null}>
      <KontaktClient />
    </Suspense>
  );
}
