import Link from "next/link";
import { Separator } from "@/src/components/ui/separator";

const footerLinks = {
  "SoraStore": [
    { label: "Tentang Kami", href: "/about" },
    { label: "Karir", href: "/karir" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
  ],
  "Bantuan": [
    { label: "FAQ", href: "/faq" },
    { label: "Cara Belanja", href: "/cara-belanja" },
    { label: "Pengiriman", href: "/pengiriman" },
    { label: "Pengembalian", href: "/pengembalian" },
  ],
  "Layanan": [
    { label: "Hubungi Kami", href: "/kontak" },
    { label: "Lacak Pesanan", href: "/lacak" },
    { label: "Gift Card", href: "/gift-card" },
    { label: "Promo", href: "/promo" },
  ],
  "Ikuti Kami": [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],
};

export function DesktopFooter() {
  return (
    <footer className="bg-secondary/30 border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>© 2026 SoraStore. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
