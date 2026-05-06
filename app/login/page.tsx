"use client";

import { useState } from "react";
import Link from "next/link";
import { useIsDesktop } from "@/src/hooks";
import { StorefrontLayout } from "@/src/components/storefront-layout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Mail, ArrowRight, ArrowLeft, ShoppingBag, MailCheck } from "lucide-react";

function LoginContent() {
  const isDesktop = useIsDesktop();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
    }
  };

  if (isDesktop) {
    return (
      <DesktopLoginView
        email={email}
        setEmail={setEmail}
        sent={sent}
        setSent={setSent}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <MobileLoginView
      email={email}
      setEmail={setEmail}
      sent={sent}
      setSent={setSent}
      onSubmit={handleSubmit}
    />
  );
}

interface ViewProps {
  email: string;
  setEmail: (v: string) => void;
  sent: boolean;
  setSent: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function DesktopLoginView({ email, setEmail, sent, setSent, onSubmit }: ViewProps) {
  if (sent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md w-full">
          <div className="h-16 w-16 rounded-full bg-emerald-50 ring-4 ring-emerald-100 flex items-center justify-center mx-auto mb-5">
            <MailCheck className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mb-2">Cek email kamu</h1>
          <p className="text-muted mb-6">
            Magic link sudah dikirim ke <strong className="text-ink">{email}</strong>.
            Buka email & klik tautannya untuk masuk.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" className="rounded-full px-5 border-hairline" onClick={() => setSent(false)}>
              Ganti email
            </Button>
            <Button className="rounded-full px-5" onClick={() => setSent(false)}>
              Kirim ulang
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-white mb-4">
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Masuk ke SoraStore</h1>
          <p className="text-sm text-muted">
            Masuk dengan magic link — tanpa password.
          </p>
        </div>

        <div className="rounded-2xl border border-hairline bg-white p-7 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink/80">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kamu@email.com"
                  className="h-12 pl-10 rounded-xl border-hairline focus-visible:ring-ink"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 rounded-full text-sm font-semibold" size="lg">
              Kirim magic link
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          <div className="relative my-6 flex items-center">
            <div className="flex-1 h-px bg-hairline" />
            <span className="px-3 text-[11px] uppercase tracking-wider text-muted">atau</span>
            <div className="flex-1 h-px bg-hairline" />
          </div>

          <Button
            variant="outline"
            className="w-full h-11 rounded-full border-hairline text-sm font-medium"
            disabled
          >
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Lanjut dengan Google
          </Button>

          <p className="text-center text-[11px] text-muted mt-5 leading-relaxed">
            Dengan masuk, kamu menyetujui{" "}
            <Link href="/terms" className="text-ink hover:underline underline-offset-2">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="/privacy" className="text-ink hover:underline underline-offset-2">
              Kebijakan Privasi
            </Link>
            .
          </p>
        </div>

        <Link
          href="/store/catalog"
          className="mt-5 block text-center text-sm font-medium text-ink/70 hover:text-ink transition-colors"
        >
          ← Lanjut sebagai tamu
        </Link>
      </div>
    </div>
  );
}

function MobileLoginView({ email, setEmail, sent, setSent, onSubmit }: ViewProps) {
  if (sent) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex flex-col px-6 pt-12 pb-8 bg-white">
        <Link href="/store/catalog" className="self-start text-ink/70 -ml-1 mb-6 inline-flex items-center text-sm">
          <ArrowLeft className="w-5 h-5 mr-1" />
          Kembali
        </Link>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="h-20 w-20 rounded-full bg-emerald-50 ring-4 ring-emerald-100 flex items-center justify-center mb-5">
            <MailCheck className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mb-2">Cek email kamu</h1>
          <p className="text-sm text-muted mb-1">
            Magic link sudah dikirim ke
          </p>
          <p className="text-sm font-medium text-ink mb-8 break-all">{email}</p>

          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            <Button
              variant="outline"
              className="rounded-full h-11 border-hairline text-sm"
              onClick={() => setSent(false)}
            >
              Ganti email
            </Button>
            <Button
              className="rounded-full h-11 text-sm"
              onClick={() => setSent(false)}
            >
              Kirim ulang
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted">
            Tidak ketemu emailnya? Cek folder Spam/Promotions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col bg-white">
      <div className="px-6 pt-8 pb-6">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-primary text-white mb-5">
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight mb-1">Selamat datang</h1>
        <p className="text-sm text-muted">
          Masuk dengan magic link — tanpa password.
        </p>
      </div>

      <div className="px-6 flex-1">
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink/80">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kamu@email.com"
                className="h-12 pl-10 rounded-xl border-hairline focus-visible:ring-ink text-base"
                required
                autoComplete="email"
                inputMode="email"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-full text-sm font-semibold mt-2"
            size="lg"
          >
            Kirim magic link
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </form>

        <div className="relative my-5 flex items-center">
          <div className="flex-1 h-px bg-hairline" />
          <span className="px-3 text-[11px] uppercase tracking-wider text-muted">atau</span>
          <div className="flex-1 h-px bg-hairline" />
        </div>

        <Button
          variant="outline"
          className="w-full h-11 rounded-full border-hairline text-sm font-medium"
          disabled
        >
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Lanjut dengan Google
        </Button>

        <p className="text-[11px] text-muted text-center mt-5 leading-relaxed">
          Dengan masuk, kamu menyetujui{" "}
          <Link href="/terms" className="text-ink underline underline-offset-2">
            Syarat
          </Link>{" "}
          dan{" "}
          <Link href="/privacy" className="text-ink underline underline-offset-2">
            Kebijakan Privasi
          </Link>
          .
        </p>
      </div>

      <div className="border-t border-hairline px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] mt-6">
        <Link
          href="/store/catalog"
          className="flex items-center justify-center gap-2 w-full h-12 rounded-full border border-hairline text-sm font-medium text-ink/80 hover:bg-surface-soft transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          Lanjut sebagai tamu
        </Link>
        <p className="text-center text-[11px] text-muted mt-3">
          Belanja tanpa akun tetap bisa dilacak via halaman pelacakan.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <StorefrontLayout>
      <LoginContent />
    </StorefrontLayout>
  );
}
