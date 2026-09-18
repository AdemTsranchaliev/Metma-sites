import type { Metadata } from "next";
import { Rubik, Syne } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBar } from "@/components/CookieBar";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin", "latin-ext"],
  variable: "--font-rubik",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "METMA Ltd. – Eierfarbe – Eierfarben und Osterdekorationen. Produktion und Handel.",
  description:
    "Hersteller von Eierfarbe, Dekorationen, Dekorationssets, Werbedisplays und Osterprodukten.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${rubik.variable} ${syne.variable} h-full antialiased`}>
      <body className="relative flex min-h-full flex-col font-sans">
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBar />
        </div>
      </body>
    </html>
  );
}
