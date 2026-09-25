import type { ReactNode } from "react";
import { Nunito, Rubik } from "next/font/google";
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="bg"
      className={`${rubik.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
