import type { ReactNode } from "react";
import { Manrope, Nunito, Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-rubik",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-fredoka",
  display: "swap",
  weight: ["600", "700", "800"],
});

// Rubik and Nunito have no Greek glyphs; globals.css swaps this in on Greek pages.
const greek = Manrope({
  subsets: ["greek"],
  variable: "--font-greek",
  display: "swap",
  preload: false,
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="bg"
      className={`${greek.variable} ${rubik.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
