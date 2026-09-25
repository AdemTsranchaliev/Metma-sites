import type { ReactNode } from "react";
import { Nunito, Rubik } from "next/font/google";
import { isLocale, localeMeta, type Locale } from "@/lib/i18n";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  variable: "--font-fredoka",
  display: "swap",
  weight: ["600", "700", "800"],
});

async function requestLocale(): Promise<Locale> {
  if (process.env.GITHUB_PAGES === "true") return "bg";
  const { headers } = await import("next/headers");
  const requested = (await headers()).get("x-locale") ?? "bg";
  return isLocale(requested) ? requested : "bg";
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await requestLocale();

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${rubik.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
