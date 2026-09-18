"use client";

import { useCallback, useEffect, useState } from "react";
import {
  deleteProduct,
  getCategories,
  getProducts,
  saveProduct,
  type Product,
  type ProductCategory,
  type ProductInput,
} from "@/lib/api";
import type { ProductCategorySlug, SiteCode } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { Badge, EmptyState } from "@/components/ui";
import { Button, Field, Modal, RowActions, inputClass, textareaClass } from "@/components/forms";
import { ProductMediaAttach } from "@/components/ProductMediaAttach";
import { Plus, Save } from "lucide-react";
import { ListToolbar, SearchField, matchesQuery } from "@/components/SearchField";

const empty: ProductInput = {
  sku: "",
  name: "",
  slug: "",
  category: "farbstoffe",
  shortDescription: "",
  description: "",
  price: null,
  currency: "EUR",
  imageUrl: null,
  imageUrls: [],
  videoUrl: null,
  isFeatured: false,
  isActive: true,
  sortOrder: 0,
};

export function ProductsManager({ site }: { site: SiteCode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [filter, setFilter] = useState<"alle" | ProductCategorySlug>("alle");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<ProductInput>(empty);
  const [slugManual, setSlugManual] = useState(false);
  const [saving, setSaving] = useState(false);

  const categoryLabel = (slug?: ProductCategorySlug | null) =>
    categories.find((c) => c.slug === slug)?.name ?? slug ?? "—";

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [products, cats] = await Promise.all([
        getProducts(site),
        getCategories(site),
      ]);
      setItems(products);
      setCategories(cats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Неуспешно зареждане");
    } finally {
      setLoading(false);
    }
  }, [site]);

  useEffect(() => {
    void reload();
  }, [reload]);

  function openCreate() {
    setEditing(null);
    const defaultCat = categories[0]?.slug ?? "farbstoffe";
    setForm({ ...empty, category: defaultCat, sortOrder: items.length + 1 });
    setSlugManual(false);
    setCreating(true);
  }

  function openEdit(p: Product) {
    setCreating(false);
    setEditing(p);
    setForm({
      sku: p.sku,
      name: p.name,
      slug: p.slug,
      category: p.category ?? "farbstoffe",
      shortDescription: p.shortDescription ?? "",
      description: p.description ?? "",
      price: null,
      currency: "EUR",
      imageUrl: p.imageUrl ?? null,
      imageUrls:
        p.imageUrls?.length
          ? p.imageUrls
          : p.imageUrl
            ? [p.imageUrl]
            : [],
      videoUrl: p.videoUrl ?? null,
      isFeatured: p.isFeatured,
      isActive: p.isActive,
      sortOrder: p.sortOrder,
    });
    setSlugManual(true);
  }

  function close() {
    setCreating(false);
    setEditing(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await saveProduct(site, form, editing?.id);
      close();
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неуспешно записване");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Изтриване на този продукт?")) return;
    try {
      await deleteProduct(site, id);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неуспешно изтриване");
    }
  }

  const open = creating || editing;
  const visible = items.filter((p) => {
    if (filter !== "alle" && p.category !== filter) return false;
    return matchesQuery(
      query,
      p.name,
      p.sku,
      p.slug,
      p.shortDescription,
      p.category,
      categoryLabel(p.category),
    );
  });

  return (
    <>
      <ListToolbar
        search={
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder="Търсене по име, SKU, slug…"
          />
        }
      >
        <Button onClick={openCreate}><Plus className="h-4 w-4" strokeWidth={2} />Нов продукт</Button>
      </ListToolbar>

      <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => setFilter("alle")}
          className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${
            filter === "alle"
              ? "bg-[var(--admin-rose)] text-white"
              : "bg-white text-[var(--admin-mute)] ring-1 ring-[var(--admin-line)] hover:text-[var(--admin-ink)]"
          }`}
        >
          Alle
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setFilter(cat.slug)}
            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${
              filter === cat.slug
                ? "bg-[var(--admin-rose)] text-white"
                : "bg-white text-[var(--admin-mute)] ring-1 ring-[var(--admin-line)] hover:text-[var(--admin-ink)]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {error ? (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-[var(--admin-mute)]">Зареждане…</p>
      ) : visible.length === 0 ? (
        <EmptyState
          message={
            query.trim()
              ? "Няма резултати за това търсене."
              : "Няма продукти в тази категория."
          }
        />
      ) : (
        <>
          <div className="admin-mobile-list grid md:hidden">
            {visible.map((p) => (
              <div key={p.id} className="admin-mobile-card">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--admin-sand)]">
                  {p.imageUrl || p.imageUrls?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.imageUrl || p.imageUrls![0]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium leading-snug">{p.name}</p>
                  <p className="mt-0.5 font-mono text-[0.7rem] text-[var(--admin-mute)]">
                    {p.sku}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge>{categoryLabel(p.category)}</Badge>
                    {p.isFeatured ? <Badge tone="good">Акцент</Badge> : null}
                    {p.isActive ? (
                      <Badge>Активен</Badge>
                    ) : (
                      <Badge tone="warn">Неактивен</Badge>
                    )}
                  </div>
                </div>
                <RowActions
                  onEdit={() => openEdit(p)}
                  onDelete={() => onDelete(p.id)}
                />
              </div>
            ))}
          </div>

          <div className="admin-panel admin-panel-scroll hidden md:block">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Снимка</th>
                  <th>SKU</th>
                  <th>Име</th>
                  <th>Категория</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3">
                      {p.imageUrl || p.imageUrls?.[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.imageUrl || p.imageUrls![0]}
                          alt=""
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <span className="text-xs text-[var(--admin-mute)]">—</span>
                      )}
                      {(p.imageUrls?.length ?? 0) > 1 || p.videoUrl ? (
                        <p className="mt-1 text-[0.65rem] text-[var(--admin-mute)]">
                          {[
                            (p.imageUrls?.length ?? (p.imageUrl ? 1 : 0)) > 0
                              ? `${p.imageUrls?.length ?? 1} сн.`
                              : null,
                            p.videoUrl ? "видео" : null,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{p.sku}</td>
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3">
                      <Badge>{categoryLabel(p.category)}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {p.isFeatured ? <Badge tone="good">Акцент</Badge> : null}
                        {p.isActive ? (
                          <Badge>Активен</Badge>
                        ) : (
                          <Badge tone="warn">Неактивен</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <RowActions
                        onEdit={() => openEdit(p)}
                        onDelete={() => onDelete(p.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {open ? (
        <Modal
          title={editing ? "Редакция на продукт" : "Нов продукт"}
          onClose={close}
          wide
          footer={
            <>
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={close}
              >
                Отказ
              </Button>
              <Button
                type="submit"
                form="product-form"
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? (
                  "Запис…"
                ) : (
                  <>
                    <Save className="h-4 w-4" strokeWidth={2} />
                    Запази
                  </>
                )}
              </Button>
            </>
          }
        >
          <form id="product-form" className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Име">
                <input
                  className={inputClass}
                  required
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setForm((f) => ({
                      ...f,
                      name,
                      slug: slugManual ? f.slug : slugify(name),
                    }));
                  }}
                />
              </Field>
              <Field label="SKU">
                <input
                  className={inputClass}
                  required
                  value={form.sku}
                  onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug">
                <input
                  className={inputClass}
                  required
                  value={form.slug}
                  onChange={(e) => {
                    setSlugManual(true);
                    setForm((f) => ({ ...f, slug: e.target.value }));
                  }}
                />
              </Field>
              <Field label="Категория">
                <select
                  className={inputClass}
                  value={form.category ?? categories[0]?.slug ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      category: e.target.value,
                    }))
                  }
                >
                  {categories.length === 0 ? (
                    <option value="">Няма категории — създайте от менюто</option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
              </Field>
            </div>
            <Field label="Кратко описание">
              <input
                className={inputClass}
                value={form.shortDescription ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, shortDescription: e.target.value }))
                }
              />
            </Field>
            <Field label="Описание">
              <textarea
                className={textareaClass}
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </Field>
            <Field label="Ред">
              <input
                className={inputClass}
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    sortOrder: Number(e.target.value) || 0,
                  }))
                }
              />
            </Field>
            <ProductMediaAttach
              site={site}
              imageUrls={form.imageUrls ?? []}
              videoUrl={form.videoUrl}
              onImagesChange={(urls) =>
                setForm((f) => ({
                  ...f,
                  imageUrls: urls,
                  imageUrl: urls[0] ?? null,
                }))
              }
              onVideoChange={(url) => setForm((f) => ({ ...f, videoUrl: url }))}
            />
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, isFeatured: e.target.checked }))
                  }
                />
                Акцент
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, isActive: e.target.checked }))
                  }
                />
                Активен
              </label>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  );
}
