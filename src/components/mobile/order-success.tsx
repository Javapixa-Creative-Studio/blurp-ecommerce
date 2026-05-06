"use client";

import Link from "next/link";
import { CheckCircle, Copy } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { cartItems, getCartTotal } from "@/src/data/cart";
import { formatPrice } from "@/src/lib/utils";

interface MobileOrderSuccessProps {
  orderId: string;
}

export function MobileOrderSuccess({ orderId }: MobileOrderSuccessProps) {
  const subtotal = getCartTotal(cartItems);
  const shippingCost = 18000;
  const total = subtotal + shippingCost;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-background pb-8">
      {/* Success Header */}
      <div className="text-center py-8 border-b">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-xl font-bold mb-1">Pesanan Berhasil!</h1>
        <p className="text-sm text-muted-foreground">
          Terima kasih telah berbelanja
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Order ID */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Nomor Pesanan</p>
            <p className="font-semibold">{orderId}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(orderId)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        {/* Payment Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="font-medium text-amber-800 text-sm mb-1">
            Menunggu Pembayaran
          </p>
          <p className="text-xs text-amber-700 mb-3">
            Selesaikan dalam 24 jam
          </p>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">VA BCA</p>
            <div className="flex items-center justify-between">
              <p className="font-mono font-bold">8880012345678</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard("8880012345678")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-lg font-bold text-amber-800 mt-3">
            {formatPrice(total)}
          </p>
        </div>

        {/* Order Items */}
        <div className="border rounded-xl p-4">
          <p className="font-medium text-sm mb-3">Item Pesanan</p>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <div className="h-12 w-12 bg-secondary rounded flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.color} • {item.size} • x{item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-3" />

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ongkir</span>
              <span>{formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-1">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="border rounded-xl p-4">
          <p className="font-medium text-sm mb-2">Alamat Pengiriman</p>
          <p className="text-xs text-muted-foreground">
            John Doe • 08123456789<br />
            Jl. Contoh No. 123, Jakarta Selatan
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <Button className="w-full" asChild>
            <Link href={`/store/order/${orderId}`}>
              Lacak Pesanan
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/store/catalog">
              Lanjut Belanja
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
