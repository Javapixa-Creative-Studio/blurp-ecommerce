"use client";

import { useState } from "react";
import Link from "next/link";
import { useIsDesktop } from "@/src/hooks";
import { StorefrontLayout } from "@/src/components/storefront-layout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Separator } from "@/src/components/ui/separator";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

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

  if (sent) {
    return (
      <div className={`${isDesktop ? "min-h-[60vh] flex items-center justify-center" : "px-4 py-16"}`}>
        <div className={`text-center ${isDesktop ? "max-w-md" : ""}`}>
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Cek Email Anda</h1>
          <p className="text-muted-foreground mb-6">
            Kami telah mengirim magic link ke <strong>{email}</strong>.
            Klik link tersebut untuk masuk.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Tidak menerima email?
          </p>
          <Button variant="outline" onClick={() => setSent(false)}>
            Kirim Ulang
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDesktop ? "min-h-[60vh] flex items-center justify-center" : "px-4 py-8"}`}>
      <div className={`w-full ${isDesktop ? "max-w-md" : ""}`}>
        <div className="text-center mb-8">
          <h1 className={`font-bold ${isDesktop ? "text-3xl" : "text-2xl"} mb-2`}>
            Masuk ke SoraStore
          </h1>
          <p className="text-muted-foreground">
            Masuk dengan magic link — tanpa perlu password
          </p>
        </div>

        <div className={`${isDesktop ? "border rounded-2xl p-8" : ""}`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Kirim Magic Link
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              atau
            </span>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full" disabled>
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Lanjut dengan Google
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Dengan masuk, Anda menyetujui{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Kebijakan Privasi
            </Link>
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Belum punya akun?{" "}
          <span className="text-primary">
            Tidak perlu daftar! Langsung belanja sebagai guest.
          </span>
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
