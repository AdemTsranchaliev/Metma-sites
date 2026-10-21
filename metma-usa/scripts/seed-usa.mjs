/**
 * Writes USA categories and products into the shared Firestore project.
 * Needs an existing admin account. Does not create users.
 *
 *   FIREBASE_ADMIN_EMAIL=... FIREBASE_ADMIN_PASSWORD=... node scripts/seed-usa.mjs
 *
 * Reads the web config from .env.local. Idempotent document ids: cat-usa-* and usa-*.
 */
import { readFileSync } from "node:fs";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

const SITE = "Usa";
const SITE_ID = "11111111-1111-1111-1111-111111111103";

function loadEnv(path) {
  const text = readFileSync(path, "utf8");
  const env = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    env[trimmed.slice(0, index)] = trimmed.slice(index + 1);
  }
  return env;
}

const env = loadEnv(new URL("../.env.local", import.meta.url));
const catalog = JSON.parse(readFileSync(new URL("../src/data/usa-catalog.json", import.meta.url), "utf8"));

const categories = [
  { slug: "classic", name: "Classic kits", description: "Tablets, cups and crayons", sortOrder: 1 },
  { slug: "children", name: "Children kits", description: "Character kits for children", sortOrder: 2 },
  { slug: "display", name: "Display", description: "Retail display", sortOrder: 3 },
  { slug: "decoration", name: "Egg decoration", description: "Stamps, wraps, pens and stickers", sortOrder: 4 },
];

const email = process.env.FIREBASE_ADMIN_EMAIL;
const password = process.env.FIREBASE_ADMIN_PASSWORD;

if (!email || !password) {
  console.error("Set FIREBASE_ADMIN_EMAIL and FIREBASE_ADMIN_PASSWORD to seed Firestore.");
  process.exit(1);
}

const app = initializeApp({
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const auth = getAuth(app);
const db = getFirestore(app);

await signInWithEmailAndPassword(auth, email, password);

for (const slug of ["farbstoffe", "sets", "dekorationen"]) {
  await setDoc(
    doc(db, "categories", `cat-usa-${slug}`),
    { isActive: false, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

for (const category of categories) {
  await setDoc(
    doc(db, "categories", `cat-usa-${category.slug}`),
    {
      site: SITE,
      siteId: SITE_ID,
      name: category.name,
      slug: category.slug,
      description: category.description,
      sortOrder: category.sortOrder,
      isActive: true,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

for (const product of catalog) {
  const images = product.images?.length ? product.images : [product.image];
  await setDoc(
    doc(db, "products", `usa-${product.slug}`),
    {
      site: SITE,
      siteId: SITE_ID,
      categoryId: `cat-usa-${product.category}`,
      category: product.category,
      brand: "metma",
      sku: product.sku,
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      description: product.shortDescription,
      contents: product.contents || null,
      instructionsUrl: product.instructionsUrl || null,
      price: null,
      currency: "USD",
      imageUrl: images[0] ?? null,
      imageUrls: images,
      videoUrl: null,
      videoIsInstruction: false,
      isFeatured: Boolean(product.isFeatured),
      isActive: true,
      sortOrder: product.sortOrder,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}

console.log(`Seeded ${categories.length} categories and ${catalog.length} products for site Usa.`);
process.exit(0);
