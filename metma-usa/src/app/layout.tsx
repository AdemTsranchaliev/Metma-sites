import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: {
    default: "METMA USA LTD.",
    template: "%s · METMA USA",
  },
  description:
    "Metma USA designs and produces Easter egg dyes, coloring kits, displays, and egg decoration.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.locale} className={`${outfit.variable} ${fraunces.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white text-[var(--usa-ink)]">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
