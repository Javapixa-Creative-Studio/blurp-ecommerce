"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Separator } from "@/src/components/ui/separator";
import { QuantityPicker } from "@/src/components/shared";
import { cartItems as initialCartItems, CartItem, getCartTotal } from "@/src/data/cart";
import { formatPrice } from "@/src/lib/utils";

export function DesktopCart() {
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    initialCartItems.map((i) => i.productId)
  );

  const selectedCartItems = items.filter((i) => selectedItems.includes(i.productId));
  const subtotal = getCartTotal(selectedCartItems);

  const toggleItem = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((i) => i.productId));
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
    setSelectedItems((prev) => prev.filter((id) => id !== productId));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Keranjang Kosong</h1>
        <p className="text-muted-foreground mb-6">
          Belum ada produk di keranjang Anda.
        </p>
        <Button asChild>
          <Link href="/store/catalog">Mulai Belanja</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Beranda</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium">Keranjang</span>
        </nav>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <h1 className="text-2xl font-bold mb-6">Keranjang ({items.length})</h1>

        <div className="grid grid-cols-[1fr_360px] gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            {/* Select All */}
            <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl">
              <Checkbox
                checked={selectedItems.length === items.length}
                onCheckedChange={toggleAll}
              />
              <span className="text-sm font-medium">
                Pilih Semua ({selectedItems.length}/{items.length})
              </span>
            </div>

            {/* Items */}
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 p-4 border rounded-xl"
              >
                <Checkbox
                  checked={selectedItems.includes(item.productId)}
                  onCheckedChange={() => toggleItem(item.productId)}
                />

                {/* Product Image */}
                <div className="h-24 w-24 bg-secondary rounded-lg flex items-center justify-center text-xs text-muted-foreground flex-shrink-0">
                  IMG
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/store/product/${item.product.slug}`}
                    className="font-medium hover:text-primary transition-colors line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.color} • {item.size}
                  </p>
                  <p className="font-semibold mt-2">
                    {formatPrice(item.product.price)}
                  </p>
                </div>

                {/* Quantity & Actions */}
                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.productId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <QuantityPicker
                    value={item.quantity}
                    onChange={(qty) => updateQuantity(item.productId, qty)}
                    max={item.product.stock}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit sticky top-24">
            <div className="border rounded-xl p-6">
              <h2 className="font-semibold text-lg mb-4">Ringkasan Belanja</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Total ({selectedItems.length} produk)
                  </span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                disabled={selectedItems.length === 0}
                asChild
              >
                <Link href="/store/checkout">
                  Checkout ({selectedItems.length})
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
