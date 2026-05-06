"use client";

import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface MobileNavbarProps {
  title?: string;
}

export function MobileNavbar({ title }: MobileNavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-14 items-center justify-between px-4">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>

        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--accent))]/70" />
          <span className="font-semibold">{title || "SoraStore"}</span>
        </Link>

        <Button variant="ghost" size="icon" className="relative" asChild>
          <Link href="/store/keranjang">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              2
            </span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
