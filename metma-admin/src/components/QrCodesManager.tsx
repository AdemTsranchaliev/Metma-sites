"use client";

import { useCallback, useEffect, useState } from "react";
import {
  deleteQrLink,
  getProducts,
  getQrLinks,
  saveQrLink,
  type Product,
  type QrLink,
} from "@/lib/api";
import { downloadQrPng } from "@/lib/qr";
import { productPublicUrl, qrPublicUrl, type SiteCode } from "@/lib/sites";
import { uniquePageCode } from "@/lib/utils";
import { EmptyState } from "@/components/ui";
import {
  Button,
  Field,
  Modal,
  RowActions,
  inputClass,
} from "@/components/forms";
import { ListToolbar, SearchField, matchesQuery } from "@/components/SearchField";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  Plus,
  RefreshCw,
  Save,
} from "lucide-react";

export function QrCodesManager({ site }: { site: SiteCode }) {
  const [items, setItems] = useState<QrLink[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<QrLink | null>(null);
  const [creating, setCreating] = useState(false);
  const [productId, setProductId] = useState("");
  const [code, setCode] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [qrBusy, setQrBusy] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [links, productList] = await Promise.all([
        getQrLinks(site),
        getProducts(site),
      ]);
      setItems(links);
      setProducts(productList.filter((p) => p.isActive));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Неуспешно зареждане");
    } finally {
      setLoading(false);
    }
  }, [site]);

  useEffect(() => {
    void reload();
  }, [reload]);

  function publicUrl(c: string) {
    return qrPublicUrl(site, c);
  }

  function selectedProduct() {
    return products.find((p) => p.id === productId) ?? null;
  }

  function openCreate() {
    setEditing(null);
    setCode(uniquePageCode());
    setProductId("");
    setRedirectUrl("");
    setCreating(true);
  }

  function openEdit(item: QrLink) {
    setCreating(false);
    setEditing(item);
    setCode(item.code);
    setProductId(item.productId ?? "");
    setRedirectUrl(item.redirectUrl);
  }

  function close() {
    setCreating(false);
    setEditing(null);
  }

  function fillUrlFromProduct() {
    const p = selectedProduct();
    if (!p) return;
    setRedirectUrl(productPublicUrl(site, p.slug));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const target = redirectUrl.trim();
    if (!target) {
      setError("Попълнете линка за пренасочване.");
      return;
    }
    const product = selectedProduct();
    setSaving(true);
    setError(null);
    try {
      await saveQrLink(
        site,
        {
          code,
          redirectUrl: target,
          productId: product?.id ?? null,
          productName: product?.name ?? null,
          productSlug: product?.slug ?? null,
        },
        editing?.id,
      );
      close();
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неуспешно записване");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Изтриване на този QR код?")) return;
    try {
      await deleteQrLink(site, id);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неуспешно изтриване");
    }
  }

  async function copyLink(item: QrLink) {
    try {
      await navigator.clipboard.writeText(publicUrl(item.code));
      setCopiedId(item.id);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setError("Копирането не бе успешно");
    }
  }

  async function downloadQr(item: QrLink) {
    setQrBusy(item.id);
    setError(null);
    try {
      await downloadQrPng(
        publicUrl(item.code),
        `metma-qr-${site.toLowerCase()}-${item.code}.png`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "QR кодът не бе генериран");
    } finally {
      setQrBusy(null);
    }
  }

  const open = creating || editing;
  const formUrl = code ? publicUrl(code) : "";

  const visible = items.filter((item) =>
    matchesQuery(
      query,
      item.productName,
      item.code,
      item.productSlug,
      item.redirectUrl,
    ),
  );

  return (
    <>
      <ListToolbar
        search={
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder="Търсене по URL, код или продукт…"
          />
        }
      >
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" strokeWidth={2} />
          Нов QR код
        </Button>
      </ListToolbar>

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
              : "Все още няма QR кодове. Създайте първия."
          }
        />
      ) : (
        <>
          <div className="admin-mobile-list grid md:hidden">
            {visible.map((item) => (
              <div key={item.id} className="admin-mobile-card !flex-col gap-3">
                <div className="flex w-full items-start gap-3">
                  <div className="min-w-0 flex-1">
                    {item.productName ? (
                      <p className="text-sm font-medium text-[var(--admin-ink)]">
                        {item.productName}
                        <span className="ml-1.5 text-[0.65rem] font-normal text-[var(--admin-mute)]">
                          (ориентация)
                        </span>
                      </p>
                    ) : (
                      <p className="text-sm text-[var(--admin-mute)]">Без продукт</p>
                    )}
                    <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--admin-mute)]">
                      Пренасочва към
                    </p>
                    <a
                      href={item.redirectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-0.5 block break-all font-mono text-[0.75rem] text-[var(--admin-rose)] hover:underline"
                    >
                      {item.redirectUrl}
                    </a>
                    <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--admin-mute)]">
                      QR линк
                    </p>
                    <p className="mt-0.5 break-all font-mono text-[0.7rem] text-[var(--admin-ink)]">
                      {publicUrl(item.code)}
                    </p>
                  </div>
                  <RowActions
                    onEdit={() => openEdit(item)}
                    onDelete={() => onDelete(item.id)}
                  />
                </div>
                <div className="grid w-full grid-cols-2 gap-2">
                  <Button
                    variant="secondary"
                    className="!min-h-10 !px-2 !text-xs"
                    onClick={() => copyLink(item)}
                  >
                    {copiedId === item.id ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={2} />
                    ) : (
                      <Copy className="h-3.5 w-3.5" strokeWidth={2} />
                    )}
                    Копирай
                  </Button>
                  <Button
                    variant="secondary"
                    className="!min-h-10 !px-2 !text-xs"
                    disabled={qrBusy === item.id}
                    onClick={() => downloadQr(item)}
                  >
                    <Download className="h-3.5 w-3.5" strokeWidth={2} />
                    QR PNG
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="admin-panel admin-panel-scroll hidden md:block">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Пренасочва към</th>
                  <th>Продукт (ориентация)</th>
                  <th>QR линк</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      <a
                        href={item.redirectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex max-w-[360px] items-center gap-1 break-all font-mono text-xs font-medium text-[var(--admin-rose)] hover:underline"
                      >
                        {item.redirectUrl}
                        <ExternalLink className="h-3 w-3 shrink-0" strokeWidth={2} />
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--admin-mute)]">
                      {item.productName || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={publicUrl(item.code)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex max-w-[240px] items-center gap-1 break-all font-mono text-xs text-[var(--admin-ink)] hover:text-[var(--admin-rose)] hover:underline"
                      >
                        /go/{item.code}
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-50" strokeWidth={2} />
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-1">
                        <Button
                          variant="ghost"
                          className="!min-h-9 !px-2.5 !py-2"
                          onClick={() => copyLink(item)}
                          aria-label="Копирай QR линк"
                        >
                          {copiedId === item.id ? (
                            <Check className="h-4 w-4" strokeWidth={2} />
                          ) : (
                            <Copy className="h-4 w-4" strokeWidth={2} />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          className="!min-h-9 !px-2.5 !py-2"
                          disabled={qrBusy === item.id}
                          onClick={() => downloadQr(item)}
                          aria-label="Изтегли QR"
                        >
                          <Download className="h-4 w-4" strokeWidth={2} />
                        </Button>
                        <RowActions
                          onEdit={() => openEdit(item)}
                          onDelete={() => onDelete(item.id)}
                        />
                      </div>
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
          title={editing ? "Редакция на QR код" : "Нов QR код"}
          onClose={close}
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
                form="qr-form"
                disabled={saving || !redirectUrl.trim()}
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
          <form id="qr-form" className="grid gap-4" onSubmit={onSubmit}>
            <Field
              label="Линк за пренасочване"
              hint="Задължително. QR /go/… води точно към този адрес."
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  className={`${inputClass} font-mono text-xs sm:text-sm`}
                  required
                  type="url"
                  value={redirectUrl}
                  onChange={(e) => setRedirectUrl(e.target.value)}
                  placeholder="https://metma-de.com/б-567-egg-dye-5-colors-tablets-for-cold-water/"
                />
                {redirectUrl.trim() ? (
                  <a
                    href={redirectUrl.trim()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[var(--admin-line)] bg-white px-3 text-sm font-semibold hover:border-[var(--admin-rose)] hover:text-[var(--admin-rose)]"
                  >
                    Провери
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                  </a>
                ) : null}
              </div>
            </Field>

            <Field
              label="Продукт (по избор)"
              hint="Само за ориентация в админа — не определя пренасочването."
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <select
                  className={inputClass}
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                >
                  <option value="">— без продукт —</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {productId ? (
                  <Button
                    type="button"
                    variant="secondary"
                    className="shrink-0 whitespace-nowrap"
                    onClick={fillUrlFromProduct}
                  >
                    Попълни URL от продукта
                  </Button>
                ) : null}
              </div>
            </Field>

            <Field label="Уникален QR код" hint="Краткият линк, който влиза в QR изображението.">
              <div className="flex gap-2">
                <input
                  className={`${inputClass} font-mono`}
                  required
                  value={code}
                  onChange={(e) =>
                    setCode(
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                    )
                  }
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="shrink-0"
                  onClick={() => setCode(uniquePageCode())}
                  aria-label="Нов код"
                >
                  <RefreshCw className="h-4 w-4" strokeWidth={2} />
                </Button>
              </div>
              {formUrl && redirectUrl.trim() ? (
                <p className="mt-2 space-y-1 rounded-lg border border-[var(--admin-line)] bg-[var(--admin-sand)] px-3 py-2.5 font-mono text-xs leading-relaxed">
                  <span className="block text-[var(--admin-mute)]">
                    QR → {formUrl}
                  </span>
                  <span className="block font-semibold text-[var(--admin-ink)]">
                    → {redirectUrl.trim()}
                  </span>
                </p>
              ) : null}
            </Field>
          </form>
        </Modal>
      ) : null}
    </>
  );
}
