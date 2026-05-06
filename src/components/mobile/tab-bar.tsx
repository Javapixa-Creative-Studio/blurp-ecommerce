"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, ShoppingCart, User } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { CartBadge } from "@/src/components/shared/cart-badge";

const tabs = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Cari", href: "/store/catalog" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: ShoppingCart, label: "Cart", href: "/store/keranjang" },
  { icon: User, label: "Akun", href: "/login" },
];

export function MobileTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/store";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.href);
          
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-2 transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
                {tab.label === "Cart" && (
                  <CartBadge
                    size="xs"
                    placement="corner"
                    offsetClassName="-top-1.5 -right-1.5"
                    textClassName="text-primary-foreground"
                  />
                )}
              </div>
              <span className={cn("text-xs mt-1", active && "font-medium")}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
