import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nunito, Rubik } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getCategories } from "@/lib/catalog";
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

export const metadata: Metadata = {
  title: { default: "Весаче", template: "%s | Весаче" },
  description: "Весаче ЕАД — боя за яйца и великденски украси от 1992 г.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const categories = await getCategories();
  return (
    <html lang="bg" className={`${rubik.variable} ${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header categories={categories} />
        <main className="flex-1">{children}</main>
        <Footer categories={categories} />
      </body>
    </html>
  );
}
