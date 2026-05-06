"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { QuantityPicker } from "@/src/components/shared";
import { cartItems as initialCartItems, CartItem, getCartTotal } from "@/src/data/cart";
import { formatPrice } from "@/src/lib/utils";

export function MobileCart() {
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
      <div className="px-4 py-16 text-center">
        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <h1 className="text-xl font-semibold mb-2">Keranjang Kosong</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Belum ada produk di keranjang.
        </p>
        <Button asChild>
          <Link href="/store/catalog">Mulai Belanja</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background pb-32">
      {/* Select All */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Checkbox
          checked={selectedItems.length === items.length}
          onCheckedChange={toggleAll}
        />
        <span className="text-sm font-medium">
          Pilih Semua ({selectedItems.length})
        </span>
      </div>

      {/* Items */}
      <div className="divide-y">
        {items.map((item) => (
          <div key={item.productId} className="p-4">
            <div className="flex gap-3">
              <Checkbox
                checked={selectedItems.includes(item.productId)}
                onCheckedChange={() => toggleItem(item.productId)}
                className="mt-1"
              />

              {/* Product Image */}
              <div className="h-20 w-20 bg-secondary rounded-lg flex items-center justify-center text-xs text-muted-foreground flex-shrink-0">
                IMG
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/store/product/${item.product.slug}`}
                  className="text-sm font-medium line-clamp-2"
                >
                  {item.product.name}
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.color} • {item.size}
                </p>
                <p className="font-semibold text-sm mt-1">
                  {formatPrice(item.product.price)}
                </p>
              </div>
            </div>

            {/* Actions Row */}
            <div className="flex items-center justify-between mt-3 ml-8">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive h-8 px-2"
                onClick={() => removeItem(item.productId)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Hapus
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

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 z-40">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-lg font-bold">{formatPrice(subtotal)}</span>
        </div>
        <Button
          className="w-full"
          disabled={selectedItems.length === 0}
          asChild
        >
          <Link href="/store/checkout">
            Checkout ({selectedItems.length})
          </Link>
        </Button>
      </div>
    </div>
  );
}
