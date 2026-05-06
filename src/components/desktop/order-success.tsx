"use client";

import Link from "next/link";
import { CheckCircle, Copy, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { cartItems, getCartTotal } from "@/src/data/cart";
import { formatPrice } from "@/src/lib/utils";

interface DesktopOrderSuccessProps {
  orderId: string;
}

export function DesktopOrderSuccess({ orderId }: DesktopOrderSuccessProps) {
  const subtotal = getCartTotal(cartItems);
  const shippingCost = 18000;
  const total = subtotal + shippingCost;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Pesanan Berhasil!</h1>
          <p className="text-muted-foreground">
            Terima kasih telah berbelanja di SoraStore
          </p>
        </div>

        {/* Order Info */}
        <div className="border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Nomor Pesanan</p>
              <p className="font-semibold text-lg">{orderId}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(orderId)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Salin
            </Button>
          </div>

          <Separator className="my-4" />

          {/* Payment Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="font-medium text-amber-800 mb-2">
              Menunggu Pembayaran
            </p>
            <p className="text-sm text-amber-700 mb-3">
              Selesaikan pembayaran dalam 24 jam
            </p>
            <div className="bg-white rounded p-3">
              <p className="text-xs text-muted-foreground mb-1">Virtual Account BCA</p>
              <div className="flex items-center justify-between">
                <p className="font-mono font-bold text-lg">8880012345678</p>
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

          <Separator className="my-4" />

          {/* Order Items */}
          <div className="space-y-3">
            <p className="font-medium">Item Pesanan</p>
            {cartItems.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <div className="h-14 w-14 bg-secondary rounded flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.color} • {item.size} • x{item.quantity}
                  </p>
                </div>
                <span className="text-sm font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ongkos Kirim</span>
              <span>{formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base pt-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="border rounded-xl p-6 mb-6">
          <p className="font-medium mb-2">Alamat Pengiriman</p>
          <p className="text-sm text-muted-foreground">
            John Doe<br />
            08123456789<br />
            Jl. Contoh No. 123<br />
            Jakarta Selatan, DKI Jakarta
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/store/catalog">
              Lanjut Belanja
            </Link>
          </Button>
          <Button className="flex-1" asChild>
            <Link href={`/store/order/${orderId}`}>
              Lacak Pesanan
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Help */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Butuh bantuan? <Link href="/kontak" className="text-primary hover:underline">Hubungi kami</Link>
        </p>
      </div>
    </div>
  );
}
