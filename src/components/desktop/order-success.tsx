"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  ArrowRight,
  Package,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { formatPrice } from "@/src/lib/utils";
import { useLastOrder, type MockOrder } from "@/src/data/mock-orders";

interface DesktopOrderSuccessProps {
  orderId: string;
}

const STATUS_STEPS: Array<{ key: MockOrder["status"]; label: string; description: string }> = [
  { key: "paid", label: "Pembayaran diterima", description: "Pembayaran kamu sudah kami konfirmasi." },
  { key: "packed", label: "Sedang dikemas", description: "Tim gudang sedang menyiapkan pesanan." },
  { key: "shipped", label: "Dikirim", description: "Paket dalam perjalanan menuju alamat." },
  { key: "delivered", label: "Sampai tujuan", description: "Pesanan kamu telah diterima." },
];

const STATUS_INDEX: Record<MockOrder["status"], number> = {
  created: 0,
  paid: 0,
  packed: 1,
  shipped: 2,
  delivered: 3,
};

export function DesktopOrderSuccess({ orderId }: DesktopOrderSuccessProps) {
  const order = useLastOrder();

  const total = order?.total ?? 0;
  const status: MockOrder["status"] = order?.status ?? "paid";
  const currentIdx = STATUS_INDEX[status];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-6 py-10 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4 ring-4 ring-emerald-100">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Pesanan kamu siap diproses</h1>
          <p className="text-muted">
            Terima kasih telah berbelanja. Konfirmasi pembayaran sudah masuk.
          </p>
        </div>

        {/* Order ID + Total card */}
        <div className="rounded-2xl border border-hairline bg-white p-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted mb-1">Nomor pesanan</p>
              <div className="flex items-center gap-2">
                <p className="font-mono font-semibold text-xl text-ink">{orderId}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={() => copyToClipboard(orderId)}
                  aria-label="Salin nomor pesanan"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted mt-1">
                Simpan untuk lacak pesanan & komunikasi.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-muted mb-1">Total dibayar</p>
              <p className="text-2xl font-semibold tabular-nums text-ink">
                {total ? formatPrice(total) : "—"}
              </p>
              <p className="text-xs text-emerald-600 mt-1 inline-flex items-center justify-end gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Lunas via Xendit
              </p>
            </div>
          </div>
        </div>

        {/* Status timeline */}
        <div className="rounded-2xl border border-hairline bg-white p-6 mb-6">
          <h2 className="font-semibold text-lg mb-1">Status pesanan</h2>
          <p className="text-xs text-muted mb-5">
            Update otomatis akan dikirim ke email & WhatsApp kamu.
          </p>
          <ol className="space-y-5">
            {STATUS_STEPS.map((s, idx) => {
              const isDone = idx < currentIdx;
              const isCurrent = idx === currentIdx;
              return (
                <li key={s.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={
                        "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors " +
                        (isDone
                          ? "bg-ink text-white"
                          : isCurrent
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface-soft text-muted border border-hairline")
                      }
                    >
                      {isDone ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                    </div>
                    {idx < STATUS_STEPS.length - 1 && (
                      <div
                        className={
                          "w-px flex-1 mt-1 " + (isDone ? "bg-ink" : "bg-hairline")
                        }
                      />
                    )}
                  </div>
                  <div className="pb-3">
                    <p
                      className={
                        "text-sm font-semibold " +
                        (isCurrent ? "text-ink" : isDone ? "text-ink/80" : "text-muted")
                      }
                    >
                      {s.label}
                    </p>
                    <p className="text-xs text-muted">{s.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Next steps */}
        <div className="rounded-2xl border border-hairline bg-surface-soft p-6 mb-6">
          <h2 className="font-semibold text-base mb-3">Apa selanjutnya?</h2>
          <div className="grid grid-cols-3 gap-3">
            <NextStepCard
              icon={Package}
              title="Lacak pesanan"
              description="Pantau status & estimasi tiba."
              href="/store/tracker"
            />
            <NextStepCard
              icon={MapPin}
              title="Edit alamat"
              description="Hubungi CS sebelum dikirim."
              href="/kontak"
            />
            <NextStepCard
              icon={MessageCircle}
              title="Tanya CS"
              description="WA balas dalam 15 menit."
              href="/kontak"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 rounded-full h-12 border-hairline" asChild>
            <Link href="/store/catalog">Lanjut belanja</Link>
          </Button>
          <Button className="flex-1 rounded-full h-12" asChild>
            <Link href="/store/tracker">
              Lacak pesanan
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <p className="text-center text-sm text-muted mt-6">
          Butuh bantuan?{" "}
          <Link href="/kontak" className="text-ink font-medium hover:underline underline-offset-2">
            Hubungi kami
          </Link>
        </p>
      </div>
    </div>
  );
}

function NextStepCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: typeof Package;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-hairline bg-white p-4 hover:bg-surface-strong transition-colors"
    >
      <div className="h-9 w-9 rounded-full bg-surface-soft flex items-center justify-center mb-3">
        <Icon className="w-4 h-4 text-ink" />
      </div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="text-xs text-muted mt-0.5">{description}</p>
    </Link>
  );
}
