import type { Metadata } from "next";
import { NotFoundView } from "@/components/NotFoundView";
import { QrRedirect } from "@/components/QrRedirect";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <QrRedirect>
      <NotFoundView />
    </QrRedirect>
  );
}
