"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, User, ShoppingCart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/store/catalog" },
  { label: "About", href: "/about" },
  { label: "Lokasi", href: "/lokasi" },
];

export function DesktopNavbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/store";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--accent))]/70" />
            <span className="text-xl font-semibold tracking-tight">SoraStore</span>
          </Link>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari produk..."
                className="pl-10 bg-secondary/50 border-transparent focus:border-border focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/wishlist" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Wishlist</span>
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/login" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Masuk</span>
              </Link>
            </Button>

            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link href="/store/keranjang" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Keranjang</span>
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  2
                </span>
              </Link>
            </Button>
          </div>
        </div>

        <nav className="flex items-center gap-6 px-6 pb-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href)
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
