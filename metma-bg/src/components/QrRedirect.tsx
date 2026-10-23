"use client";

import { useEffect, useState, type ReactNode } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase/client";

const SITE = "Bg";

function currentSlug() {
  let path = window.location.pathname;
  try {
    path = decodeURIComponent(path);
  } catch {
    /* keep the raw path */
  }
  return path.replace(/^\/+|\/+$/g, "").toLowerCase();
}

/** Unknown addresses such as /ime/ open the link saved in the admin. */
export function QrRedirect({ children }: { children: ReactNode }) {
  const [stay, setStay] = useState(false);

  useEffect(() => {
    const slug = currentSlug();
    if (!slug || slug.includes("/") || !isFirebaseConfigured) {
      setStay(true);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(getDb(), "qrLinks"), where("productSlug", "==", slug)),
        );
        const hit = snap.docs.map((doc) => doc.data()).find((data) => data.site === SITE);
        const target = String(hit?.forwardUrl ?? "").trim();
        if (!cancelled && /^https?:\/\//i.test(target)) {
          window.location.replace(target);
          return;
        }
      } catch {
        /* show the normal 404 */
      }
      if (!cancelled) setStay(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!stay) {
    return <p className="py-24 text-center text-sm opacity-70">Пренасочване…</p>;
  }

  return children;
}
