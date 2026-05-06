"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingCart, X, Search, Heart, User, Home, Grid3x3, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { CartBadge } from "@/src/components/shared/cart-badge";

interface MobileNavbarProps {
  title?: string;
}

export function MobileNavbar({ title }: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-hairline">
        <div className="flex h-14 items-center justify-between px-4">
          {/* Hamburger Menu */}
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5" onClick={() => setIsMenuOpen(false)}>
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="font-semibold text-ink">{title || "SoraStore"}</span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/store/keranjang">
                <ShoppingCart className="h-5 w-5" />
                <CartBadge size="sm" placement="corner" offsetClassName="-top-0.5 -right-0.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-3">
          <button 
            className="w-full flex items-center gap-2 px-4 py-2.5 bg-surface-soft rounded-full text-sm text-muted border border-transparent hover:border-hairline transition-colors"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-4 h-4" />
            <span>Cari produk...</span>
          </button>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center gap-3 p-4 border-b">
            <button onClick={() => setIsSearchOpen(false)}>
              <X className="h-5 w-5" />
            </button>
            <Input 
              type="search" 
              placeholder="Cari produk..." 
              className="flex-1 border-0 bg-transparent focus:ring-0"
              autoFocus
            />
            <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted mb-4">Pencarian populer</p>
            <div className="flex flex-wrap gap-2">
              {["Elektronik", "Fashion", "Skincare", "Headphone", "Jam"].map((term) => (
                <button 
                  key={term}
                  className="px-4 py-2 bg-surface-soft rounded-full text-sm hover:bg-hairline transition-colors"
                  onClick={() => setIsSearchOpen(false)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-scrim/50" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-hairline">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="font-semibold">SoraStore</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <div className="space-y-1">
                <Link
                  href="/store"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-soft transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="w-5 h-5 text-muted" />
                  <span className="font-medium">Beranda</span>
                </Link>
                <Link
                  href="/store/catalog"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-soft transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Grid3x3 className="w-5 h-5 text-muted" />
                  <span className="font-medium">Katalog</span>
                  <span className="ml-auto text-[8px] font-bold tracking-wider uppercase text-muted">NEW</span>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-soft transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Sparkles className="w-5 h-5 text-muted" />
                  <span className="font-medium">Tentang</span>
                </Link>
              </div>

              <div className="border-t border-hairline my-4" />

              <div className="space-y-1">
                <Link
                  href="/host"
                  className="flex items-center p-3 rounded-lg hover:bg-surface-soft transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Become a Host
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-soft transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="w-5 h-5 text-muted" />
                  <span className="font-medium">Wishlist</span>
                </Link>
                <Link
                  href="/store/keranjang"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-soft transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5 text-muted" />
                  <span className="font-medium">Keranjang</span>
                </Link>
              </div>

              <div className="border-t border-hairline my-4" />

              <div className="space-y-1">
                <Link
                  href="/login"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-soft transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 text-muted" />
                  <span className="font-medium">Masuk</span>
                </Link>
              </div>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-hairline">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </Button>
                <span className="text-sm text-muted">IDR</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}