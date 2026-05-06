"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Heart, Share2, Truck, ShieldCheck, RotateCcw, Star } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { QuantityPicker } from "@/src/components/shared";
import { Product } from "@/src/data/products";
import { shippingOptions, cities } from "@/src/data/shipping";
import { formatPrice, calculateDiscount, cn } from "@/src/lib/utils";

interface DesktopProductDetailProps {
  product: Product;
}

export function DesktopProductDetail({ product }: DesktopProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedCity, setSelectedCity] = useState("");
  const [showShipping, setShowShipping] = useState(false);

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : null;

  const isLowStock = product.stock <= 3;

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Beranda</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/store/catalog" className="hover:text-foreground transition-colors">Katalog</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href={`/store/catalog?category=${product.categorySlug}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground">
              {product.name}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-secondary rounded-lg flex items-center justify-center text-xs text-muted-foreground cursor-pointer hover:ring-2 ring-primary transition-all"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  {product.isNew && <Badge className="mb-2">BARU</Badge>}
                  <h1 className="text-2xl font-bold">{product.name}</h1>
                  <p className="text-muted-foreground mt-1">SKU: {product.sku}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-4 w-4",
                        star <= Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} ulasan)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="destructive">-{discount}%</Badge>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">
                  Warna: <span className="text-muted-foreground">{selectedColor}</span>
                </h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={cn(
                        "h-10 w-10 rounded-full border-2 transition-all",
                        selectedColor === color.name
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Ukuran</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className="h-10 w-12"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Jumlah</h3>
              <div className="flex items-center gap-4">
                <QuantityPicker
                  value={quantity}
                  onChange={setQuantity}
                  max={product.stock}
                />
                {isLowStock && (
                  <span className="text-sm text-destructive">
                    Sisa {product.stock} item
                  </span>
                )}
              </div>
            </div>

            <Separator />

            {/* Cek Ongkir */}
            <div className="bg-secondary/50 rounded-xl p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Cek Ongkos Kirim
              </h3>
              <div className="flex gap-3">
                <Select value={selectedCity} onValueChange={(v) => {
                  setSelectedCity(v);
                  setShowShipping(true);
                }}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Pilih kota tujuan..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}, {city.province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {showShipping && selectedCity && (
                <div className="mt-4 space-y-2">
                  {shippingOptions.map((opt) => (
                    <div
                      key={opt.id}
                      className="flex items-center justify-between py-2 px-3 bg-white rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{opt.name}</p>
                        <p className="text-xs text-muted-foreground">{opt.estimate}</p>
                      </div>
                      <span className="font-medium">{formatPrice(opt.price)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1">
                Tambah ke Keranjang
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Beli Sekarang
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-5 w-5" />
                <span>100% Original</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-5 w-5" />
                <span>Gratis Ongkir*</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RotateCcw className="h-5 w-5" />
                <span>Tukar 7 Hari</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description, Specs, Reviews */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Deskripsi</TabsTrigger>
              <TabsTrigger value="specs">Spesifikasi</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan ({product.reviewCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <p className="text-muted-foreground max-w-2xl">{product.description}</p>
            </TabsContent>
            <TabsContent value="specs" className="mt-6">
              <div className="max-w-md space-y-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <p className="text-muted-foreground">Belum ada ulasan untuk produk ini.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
