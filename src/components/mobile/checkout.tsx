"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Truck,
  CreditCard,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { shippingOptions, cities } from "@/src/data/shipping";
import { cn, formatPrice } from "@/src/lib/utils";
import Link from "next/link";
import { useCart } from "@/src/components/shared/cart-provider";
import { saveLastOrder } from "@/src/data/mock-orders";
import { SafeImage } from "@/src/components/shared/safe-image";
import { SummaryRowSkeleton, Skeleton } from "@/src/components/shared/skeleton";
import { useSimulatedLoading } from "@/src/hooks/use-simulated-loading";

function normalizePhone(input: string) {
  return input.replace(/[^\d]/g, "");
}

function makeOrderId() {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `ORD-${n}`;
}

const STEPS = [
  { num: 1, label: "Alamat", icon: MapPin },
  { num: 2, label: "Kirim", icon: Truck },
  { num: 3, label: "Bayar", icon: CreditCard },
] as const;

export function MobileCheckout() {
  const router = useRouter();
  const cart = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const isSummaryLoading = useSimulatedLoading(700);

  const items = useMemo(() => cart.items.filter((it) => Boolean(it.product)), [cart.items]);
  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + (it.product?.price ?? 0) * it.line.quantity, 0),
    [items]
  );
  const totalUnits = useMemo(
    () => items.reduce((sum, it) => sum + it.line.quantity, 0),
    [items]
  );
  const shippingOpt = shippingOptions.find((s) => s.id === selectedShipping);
  const shippingCost = shippingOpt?.price || 0;
  const total = subtotal + shippingCost;

  const canProceed = () => {
    if (step === 1) return Boolean(name && phone && email && address && selectedCity);
    if (step === 2) return Boolean(selectedShipping);
    if (step === 3) return true;
    return false;
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((step + 1) as 1 | 2 | 3);
      setShowSummary(false);
    } else {
      const orderId = makeOrderId();
      saveLastOrder({
        id: orderId,
        phone: normalizePhone(phone),
        createdAt: new Date().toISOString(),
        total,
        status: "paid",
      });
      cart.clear();
      router.push(`/store/order/${orderId}`);
    }
  };

  if (cart.isHydrated && items.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <h1 className="text-xl font-semibold mb-2">Checkout</h1>
        <p className="text-sm text-muted mb-4">Keranjang kamu masih kosong.</p>
        <Button asChild size="lg" className="rounded-full px-6">
          <Link href="/store/catalog">Mulai belanja</Link>
        </Button>
      </div>
    );
  }

  const cityName = (id: string) => cities.find((c) => c.id === id)?.name ?? "";

  return (
    <div className="bg-background pb-44">
      {/* Progress header */}
      <div className="bg-white border-b border-hairline px-4 pt-3 pb-4">
        <div className="flex items-center gap-2 mb-3">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as 1 | 2 | 3)}
              className="text-ink/70 -ml-1 p-1"
              aria-label="Kembali"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <Link href="/store/keranjang" className="text-ink/70 -ml-1 p-1" aria-label="Kembali">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted">Langkah {step} dari 3</p>
            <p className="text-sm font-semibold text-ink">{STEPS[step - 1]?.label}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {STEPS.map((s, idx) => {
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="flex-1 flex items-center gap-2">
                <div
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    isDone ? "bg-ink" : isCurrent ? "bg-primary" : "bg-surface-soft"
                  )}
                />
                {idx === STEPS.length - 1 && (
                  <span className="text-[10px] font-semibold text-muted tabular-nums">
                    {step}/3
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {step === 1 && (
          <section className="rounded-2xl border border-hairline bg-white p-4 space-y-3">
            <header className="pb-1">
              <h2 className="font-semibold text-ink flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Alamat pengiriman
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Tidak perlu daftar — cukup isi alamat.
              </p>
            </header>

            <Field label="Nama lengkap" required>
              <Input
                className="h-11 rounded-xl border-hairline focus-visible:ring-ink"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama sesuai KTP"
              />
            </Field>
            <Field label="No. HP (WhatsApp)" required>
              <Input
                className="h-11 rounded-xl border-hairline focus-visible:ring-ink"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                inputMode="tel"
              />
            </Field>
            <Field label="Email" required helper="Konfirmasi & pembayaran dikirim ke email ini.">
              <Input
                type="email"
                className="h-11 rounded-xl border-hairline focus-visible:ring-ink"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kamu@email.com"
              />
            </Field>
            <Field label="Kota" required>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="h-11 rounded-xl border-hairline">
                  <SelectValue placeholder="Pilih kota..." />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Alamat lengkap" required>
              <Input
                className="h-11 rounded-xl border-hairline focus-visible:ring-ink"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan"
              />
            </Field>
          </section>
        )}

        {step === 2 && (
          <section className="rounded-2xl border border-hairline bg-white p-4">
            <header className="pb-3">
              <h2 className="font-semibold text-ink flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Pilih pengiriman
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Estimasi tiba ke {cityName(selectedCity) || "kota tujuan"}.
              </p>
            </header>
            <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
              <div className="space-y-2">
                {shippingOptions.map((opt) => {
                  const isActive = selectedShipping === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={cn(
                        "flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all",
                        isActive
                          ? "border-ink bg-surface-soft"
                          : "border-hairline"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <RadioGroupItem value={opt.id} />
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-ink">{opt.name}</p>
                          <p className="text-[11px] text-muted">{opt.estimate}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-sm tabular-nums">
                        {formatPrice(opt.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </RadioGroup>
          </section>
        )}

        {step === 3 && (
          <>
            <section className="rounded-2xl border-2 border-ink bg-surface-soft p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-ink text-white flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-white stroke-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-ink">Bayar via Xendit</p>
                  <p className="text-[11px] text-muted">
                    VA, e-wallet, kartu, & QRIS.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-hairline bg-white p-4 text-sm">
              <p className="text-[11px] uppercase tracking-wider text-muted mb-1">Kirim ke</p>
              <p className="font-medium text-ink">{name || "—"}</p>
              <p className="text-xs text-muted">
                {phone || "—"} • {email || "—"}
              </p>
              <p className="text-xs text-muted mt-1">
                {address || "—"}
                {selectedCity && `, ${cityName(selectedCity)}`}
              </p>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-2 text-xs font-medium text-ink underline underline-offset-2"
              >
                Edit alamat
              </button>
            </section>

            <section className="rounded-2xl bg-surface-soft border border-hairline p-3 flex items-start gap-2 text-xs text-ink/80">
              <ShieldCheck className="w-4 h-4 mt-0.5 text-ink/70 shrink-0" />
              <p>
                Setelah klik bayar kamu akan diarahkan ke halaman konfirmasi pesanan.
                Demo ini tidak menarik biaya sungguhan.
              </p>
            </section>
          </>
        )}
      </div>

      {/* Sticky bottom action bar with collapsible summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-hairline z-40 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.08)]">
        {showSummary && (
          <div className="px-4 py-3 border-b border-hairline max-h-72 overflow-y-auto">
            {isSummaryLoading ? (
              <div className="space-y-3" aria-busy="true">
                {Array.from({ length: Math.min(items.length || 2, 3) }).map((_, i) => (
                  <SummaryRowSkeleton key={i} />
                ))}
                <div className="space-y-1.5 pt-2 border-t border-hairline">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-hairline">
                  {items.map((item) => (
                    <li
                      key={`${item.line.productId}::${item.line.color ?? ""}::${item.line.size ?? ""}`}
                      className="py-2.5 flex gap-3"
                    >
                      <div className="relative h-12 w-12 bg-surface-soft rounded-lg overflow-hidden flex-shrink-0">
                        <SafeImage
                          src={
                            item.product?.images?.[0] ||
                            `https://picsum.photos/seed/${item.product?.slug ?? item.line.productId}/120/120`
                          }
                          alt={item.product?.name ?? "Produk"}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-ink text-white text-[10px] font-bold flex items-center justify-center">
                          {item.line.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-ink line-clamp-1">
                          {item.product?.name ?? "Produk"}
                        </p>
                        <p className="text-[11px] text-muted line-clamp-1">
                          {[item.line.color, item.line.size].filter(Boolean).join(" • ") || "—"}
                        </p>
                      </div>
                      <span className="text-xs font-semibold tabular-nums">
                        {formatPrice((item.product?.price ?? 0) * item.line.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 pt-2 border-t border-hairline space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Ongkir</span>
                    <span className="tabular-nums">
                      {shippingCost ? formatPrice(shippingCost) : "—"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <div className="px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => setShowSummary((v) => !v)}
            className="w-full flex items-center justify-between mb-2"
            aria-expanded={showSummary}
          >
            <span className="text-xs text-muted">
              Total ({totalUnits} barang)
            </span>
            <span className="inline-flex items-center text-lg font-semibold tabular-nums">
              {formatPrice(total)}
              {showSummary ? (
                <ChevronDown className="w-4 h-4 ml-1 text-muted" />
              ) : (
                <ChevronUp className="w-4 h-4 ml-1 text-muted" />
              )}
            </span>
          </button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full h-12 rounded-full text-sm font-semibold"
          >
            {step === 3 ? (
              <>
              <Lock className="w-4 h-4 mr-2 text-white stroke-white" />
                Bayar sekarang
              </>
            ) : (
              <>
                Lanjut
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  helper,
  children,
}: {
  label: string;
  required?: boolean;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-ink/80">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
      {helper && <p className="text-[11px] text-muted">{helper}</p>}
    </div>
  );
}
