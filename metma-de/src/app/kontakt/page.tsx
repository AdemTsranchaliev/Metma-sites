import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { KontaktClient } from "@/components/KontaktClient";
import { contactPageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Kontakt zu METMA: Adresse in Pazardzhik, Telefon und Anfrage für Sortiment, Displays und Großhandel.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd({ title: "Kontakt", path: "/kontakt" })} />
      <Suspense fallback={null}>
        <KontaktClient />
      </Suspense>
    </>
  );
}
