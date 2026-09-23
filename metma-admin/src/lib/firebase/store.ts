import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getDb, getFirebaseStorage } from "./client";
import { MOCK_SITES } from "@/lib/mock-data";
import type {
  BlogPost,
  MediaAsset,
  Page,
  Product,
  ProductCategory,
  QrLink,
  SiteCode,
} from "@/lib/types";
import { DEFAULT_PRODUCT_CATEGORIES } from "@/lib/types";
import { newId } from "@/lib/utils";

export const COLLECTIONS = {
  products: "products",
  pages: "pages",
  blogPosts: "blogPosts",
  media: "media",
  categories: "categories",
  qrLinks: "qrLinks",
} as const;

export function siteIdFor(code: SiteCode) {
  return MOCK_SITES.find((s) => s.code === code)!.id;
}

function withId<T extends DocumentData>(id: string, data: T) {
  return { id, ...data } as T & { id: string };
}

async function listBySite<T extends { id: string }>(
  col: string,
  site: SiteCode,
  map: (id: string, data: DocumentData) => T,
  orderField?: string,
) {
  const base = collection(getDb(), col);
  const q = orderField
    ? query(base, where("site", "==", site), orderBy(orderField, "asc"))
    : query(base, where("site", "==", site));
  const snap = await getDocs(q);
  return snap.docs.map((d) => map(d.id, d.data()));
}

/* ─── Products ─── */

export async function fbGetProducts(site: SiteCode, featuredOnly = false) {
  const list = await listBySite<Product>(
    COLLECTIONS.products,
    site,
    (id, data) =>
      withId(id, {
        siteId: data.siteId ?? siteIdFor(site),
        categoryId: data.categoryId ?? null,
        category: data.category ?? null,
        sku: data.sku ?? "",
        name: data.name ?? "",
        slug: data.slug ?? "",
        shortDescription: data.shortDescription ?? null,
        description: data.description ?? null,
        price: null,
        currency: data.currency ?? "EUR",
        imageUrl: data.imageUrl ?? null,
        imageUrls: data.imageUrls ?? (data.imageUrl ? [data.imageUrl] : []),
        videoUrl: data.videoUrl ?? null,
        isFeatured: Boolean(data.isFeatured),
        isActive: data.isActive !== false,
        sortOrder: Number(data.sortOrder ?? 0),
      }),
    "sortOrder",
  );
  return featuredOnly ? list.filter((p) => p.isFeatured) : list;
}

export async function fbSaveProduct(
  site: SiteCode,
  input: Omit<Product, "id" | "siteId">,
  id?: string,
) {
  const siteId = siteIdFor(site);
  const imageUrls = input.imageUrls?.length
    ? input.imageUrls
    : input.imageUrl
      ? [input.imageUrl]
      : [];
  const payload = {
    site,
    siteId,
    categoryId: input.categoryId ?? null,
    category: input.category ?? null,
    sku: input.sku,
    name: input.name,
    slug: input.slug,
    shortDescription: input.shortDescription ?? null,
    description: input.description ?? null,
    price: null,
    currency: input.currency || "EUR",
    imageUrl: imageUrls[0] ?? null,
    imageUrls,
    videoUrl: input.videoUrl ?? null,
    isFeatured: input.isFeatured,
    isActive: input.isActive,
    sortOrder: input.sortOrder,
    updatedAt: serverTimestamp(),
  };

  if (id) {
    await setDoc(doc(getDb(), COLLECTIONS.products, id), payload, {
      merge: true,
    });
    return { id, siteId, ...input, imageUrls, imageUrl: imageUrls[0] ?? null };
  }

  const refDoc = await addDoc(collection(getDb(), COLLECTIONS.products), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return {
    id: refDoc.id,
    siteId,
    ...input,
    imageUrls,
    imageUrl: imageUrls[0] ?? null,
  };
}

export async function fbDeleteProduct(id: string) {
  await deleteDoc(doc(getDb(), COLLECTIONS.products, id));
}

/* ─── Pages ─── */

export async function fbGetPages(site: SiteCode) {
  return listBySite<Page>(COLLECTIONS.pages, site, (id, data) =>
    withId(id, {
      siteId: data.siteId ?? siteIdFor(site),
      title: data.title ?? "",
      slug: data.slug ?? "",
      heroTitle: data.heroTitle ?? null,
      heroSubtitle: data.heroSubtitle ?? null,
      bodyHtml: data.bodyHtml ?? null,
      metaTitle: data.metaTitle ?? null,
      metaDescription: data.metaDescription ?? null,
      isPublished: Boolean(data.isPublished),
    }),
  );
}

export async function fbGetPageBySlug(site: SiteCode, slug: string) {
  const q = query(
    collection(getDb(), COLLECTIONS.pages),
    where("site", "==", site),
    where("slug", "==", slug),
  );
  const snap = await getDocs(q);
  const d = snap.docs[0];
  if (!d) return null;
  const data = d.data();
  if (!data.isPublished) return null;
  return withId(d.id, {
    siteId: data.siteId ?? siteIdFor(site),
    title: data.title ?? "",
    slug: data.slug ?? "",
    heroTitle: data.heroTitle ?? null,
    heroSubtitle: data.heroSubtitle ?? null,
    bodyHtml: data.bodyHtml ?? null,
    metaTitle: data.metaTitle ?? null,
    metaDescription: data.metaDescription ?? null,
    isPublished: true,
  }) as Page;
}

export async function fbSavePage(
  site: SiteCode,
  input: Omit<Page, "id" | "siteId">,
  id?: string,
) {
  const siteId = siteIdFor(site);
  const payload = {
    site,
    siteId,
    ...input,
    updatedAt: serverTimestamp(),
  };
  if (id) {
    await setDoc(doc(getDb(), COLLECTIONS.pages, id), payload, { merge: true });
    return { id, siteId, ...input };
  }
  const refDoc = await addDoc(collection(getDb(), COLLECTIONS.pages), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return { id: refDoc.id, siteId, ...input };
}

export async function fbDeletePage(id: string) {
  await deleteDoc(doc(getDb(), COLLECTIONS.pages, id));
}

/* ─── Blog ─── */

export async function fbGetBlog(site: SiteCode, publishedOnly = false) {
  const list = await listBySite<BlogPost>(
    COLLECTIONS.blogPosts,
    site,
    (id, data) =>
      withId(id, {
        siteId: data.siteId ?? siteIdFor(site),
        title: data.title ?? "",
        slug: data.slug ?? "",
        excerpt: data.excerpt ?? null,
        bodyHtml: data.bodyHtml ?? null,
        coverImageUrl: data.coverImageUrl ?? null,
        isPublished: Boolean(data.isPublished),
        publishedAtUtc: data.publishedAtUtc ?? null,
      }),
  );
  return publishedOnly ? list.filter((p) => p.isPublished) : list;
}

export async function fbSaveBlog(
  site: SiteCode,
  input: Omit<BlogPost, "id" | "siteId">,
  id?: string,
) {
  const siteId = siteIdFor(site);
  const payload = {
    site,
    siteId,
    ...input,
    publishedAtUtc: input.isPublished
      ? (input.publishedAtUtc ?? new Date().toISOString())
      : null,
    updatedAt: serverTimestamp(),
  };
  if (id) {
    await setDoc(doc(getDb(), COLLECTIONS.blogPosts, id), payload, {
      merge: true,
    });
    return {
      id,
      siteId,
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt ?? null,
      bodyHtml: input.bodyHtml ?? null,
      coverImageUrl: input.coverImageUrl ?? null,
      isPublished: input.isPublished,
      publishedAtUtc: payload.publishedAtUtc,
    };
  }
  const refDoc = await addDoc(collection(getDb(), COLLECTIONS.blogPosts), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return {
    id: refDoc.id,
    siteId,
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt ?? null,
    bodyHtml: input.bodyHtml ?? null,
    coverImageUrl: input.coverImageUrl ?? null,
    isPublished: input.isPublished,
    publishedAtUtc: payload.publishedAtUtc,
  };
}

export async function fbDeleteBlog(id: string) {
  await deleteDoc(doc(getDb(), COLLECTIONS.blogPosts, id));
}

/* ─── Media ─── */

export async function fbGetMedia(site: SiteCode) {
  return listBySite<MediaAsset>(COLLECTIONS.media, site, (id, data) =>
    withId(id, {
      siteId: data.siteId ?? siteIdFor(site),
      fileName: data.fileName ?? "",
      contentType: data.contentType ?? "",
      sizeBytes: Number(data.sizeBytes ?? 0),
      publicUrl: data.publicUrl ?? "",
      altText: data.altText ?? null,
    }),
  );
}

export async function fbSaveMedia(
  site: SiteCode,
  asset: Omit<MediaAsset, "id"> & { id?: string; storagePath?: string },
) {
  const siteId = siteIdFor(site);
  const id = asset.id ?? newId();
  const payload = {
    site,
    siteId,
    fileName: asset.fileName,
    contentType: asset.contentType,
    sizeBytes: asset.sizeBytes,
    publicUrl: asset.publicUrl,
    altText: asset.altText ?? null,
    storagePath: asset.storagePath ?? null,
    updatedAt: serverTimestamp(),
  };
  await setDoc(doc(getDb(), COLLECTIONS.media, id), payload, { merge: true });
  return {
    id,
    siteId,
    fileName: asset.fileName,
    contentType: asset.contentType,
    sizeBytes: asset.sizeBytes,
    publicUrl: asset.publicUrl,
    altText: asset.altText ?? null,
  } satisfies MediaAsset;
}

export async function fbDeleteMedia(id: string) {
  const snap = await getDoc(doc(getDb(), COLLECTIONS.media, id));
  const path = snap.data()?.storagePath as string | undefined;
  await deleteDoc(doc(getDb(), COLLECTIONS.media, id));
  if (path) {
    try {
      await deleteObject(ref(getFirebaseStorage(), path));
    } catch {
      /* file may already be gone */
    }
  }
}

export async function fbUploadFile(
  site: SiteCode,
  file: File,
  altText?: string,
) {
  const ext = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf("."))
    : "";
  const storagePath = `sites/${site}/${Date.now()}-${newId()}${ext}`;
  const storageRef = ref(getFirebaseStorage(), storagePath);
  await uploadBytes(storageRef, file, { contentType: file.type });
  const publicUrl = await getDownloadURL(storageRef);
  return {
    fileName: file.name,
    contentType: file.type,
    sizeBytes: file.size,
    publicUrl,
    altText: altText ?? null,
    r2Key: storagePath,
    storagePath,
  };
}

/* ─── Categories ─── */

export async function fbGetCategories(site: SiteCode) {
  const list = await listBySite<ProductCategory>(
    COLLECTIONS.categories,
    site,
    (id, data) =>
      withId(id, {
        siteId: data.siteId ?? siteIdFor(site),
        name: data.name ?? "",
        slug: data.slug ?? "",
        description: data.description ?? null,
        sortOrder: Number(data.sortOrder ?? 0),
        isActive: data.isActive !== false,
      }),
    "sortOrder",
  );

  if (list.length > 0) return list;

  // Seed defaults once per site
  const siteId = siteIdFor(site);
  const seeded: ProductCategory[] = [];
  for (const [i, c] of DEFAULT_PRODUCT_CATEGORIES.entries()) {
    const id = `cat-${site.toLowerCase()}-${c.slug}`;
    const row: ProductCategory = {
      id,
      siteId,
      ...c,
      sortOrder: c.sortOrder || i + 1,
    };
    await setDoc(doc(getDb(), COLLECTIONS.categories, id), {
      site,
      siteId,
      name: row.name,
      slug: row.slug,
      description: row.description ?? null,
      sortOrder: row.sortOrder,
      isActive: row.isActive,
    });
    seeded.push(row);
  }
  return seeded;
}

export async function fbSaveCategory(
  site: SiteCode,
  input: Omit<ProductCategory, "id" | "siteId">,
  id?: string,
) {
  const siteId = siteIdFor(site);
  const docId = id ?? newId();
  await setDoc(
    doc(getDb(), COLLECTIONS.categories, docId),
    {
      site,
      siteId,
      ...input,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
  return { id: docId, siteId, ...input };
}

export async function fbDeleteCategory(id: string) {
  await deleteDoc(doc(getDb(), COLLECTIONS.categories, id));
}

/* ─── QR links ─── */

export async function fbGetQrLinks(site: SiteCode) {
  return listBySite<QrLink>(COLLECTIONS.qrLinks, site, (id, data) =>
    withId(id, {
      siteId: data.siteId ?? siteIdFor(site),
      code: data.code ?? "",
      redirectUrl: data.redirectUrl ?? "",
      productId: data.productId ?? null,
      productName: data.productName ?? null,
      productSlug: data.productSlug ?? null,
      createdAtUtc: data.createdAtUtc ?? new Date().toISOString(),
    }),
  );
}

export async function fbGetQrLinkByCode(site: SiteCode, code: string) {
  const q = query(
    collection(getDb(), COLLECTIONS.qrLinks),
    where("site", "==", site),
    where("code", "==", code),
  );
  const snap = await getDocs(q);
  const d = snap.docs[0];
  if (!d) return null;
  const data = d.data();
  return withId(d.id, {
    siteId: data.siteId ?? siteIdFor(site),
    code: data.code ?? "",
    redirectUrl: data.redirectUrl ?? "",
    productId: data.productId ?? null,
    productName: data.productName ?? null,
    productSlug: data.productSlug ?? null,
    createdAtUtc: data.createdAtUtc ?? new Date().toISOString(),
  }) as QrLink;
}

export async function fbSaveQrLink(
  site: SiteCode,
  input: {
    code: string;
    redirectUrl: string;
    productId?: string | null;
    productName?: string | null;
    productSlug?: string | null;
    createdAtUtc?: string;
  },
  id?: string,
) {
  const siteId = siteIdFor(site);
  const createdAtUtc = input.createdAtUtc ?? new Date().toISOString();
  const payload = {
    site,
    siteId,
    code: input.code,
    redirectUrl: input.redirectUrl.trim(),
    productId: input.productId || null,
    productName: input.productName || null,
    productSlug: input.productSlug || null,
    createdAtUtc,
    updatedAt: serverTimestamp(),
  };
  if (id) {
    await setDoc(doc(getDb(), COLLECTIONS.qrLinks, id), payload, {
      merge: true,
    });
    return {
      id,
      siteId,
      code: payload.code,
      redirectUrl: payload.redirectUrl,
      productId: payload.productId,
      productName: payload.productName,
      productSlug: payload.productSlug,
      createdAtUtc: payload.createdAtUtc,
    };
  }
  const refDoc = await addDoc(collection(getDb(), COLLECTIONS.qrLinks), payload);
  return {
    id: refDoc.id,
    siteId,
    code: payload.code,
    redirectUrl: payload.redirectUrl,
    productId: payload.productId,
    productName: payload.productName,
    productSlug: payload.productSlug,
    createdAtUtc: payload.createdAtUtc,
  };
}

export async function fbDeleteQrLink(id: string) {
  await deleteDoc(doc(getDb(), COLLECTIONS.qrLinks, id));
}

export async function fbUpdateDoc(
  col: string,
  id: string,
  data: DocumentData,
) {
  await updateDoc(doc(getDb(), col, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}
