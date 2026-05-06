"use client";

import { useState } from "react";
import { Heart, Share2, Truck, ShieldCheck, RotateCcw, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
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

interface MobileProductDetailProps {
  product: Product;
}

export function MobileProductDetail({ product }: MobileProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedCity, setSelectedCity] = useState("");
  const [showShipping, setShowShipping] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : null;

  const isLowStock = product.stock <= 3;

  return (
    <div className="bg-background pb-24">
      {/* Image Carousel Placeholder */}
      <div className="aspect-square bg-secondary flex items-center justify-center text-muted-foreground">
        {product.name}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 p-4 overflow-x-auto">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-16 w-16 flex-shrink-0 bg-secondary rounded-lg flex items-center justify-center text-xs text-muted-foreground"
          >
            {i}
          </div>
        ))}
      </div>

      <div className="px-4 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {product.isNew && <Badge className="mb-2 text-xs">BARU</Badge>}
              <h1 className="text-xl font-bold leading-tight">{product.name}</h1>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-3.5 w-3.5",
                    star <= Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <Badge variant="destructive" className="text-xs">-{discount}%</Badge>
              </>
            )}
          </div>
        </div>

        <Separator />

        {/* Color Selection */}
        {product.colors.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">
              Warna: {selectedColor}
            </h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={cn(
                    "h-9 w-9 rounded-full border-2 transition-all",
                    selectedColor === color.name
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border"
                  )}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedColor(color.name)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Ukuran</h3>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  className="h-9 w-11"
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
          <h3 className="text-sm font-medium mb-2">Jumlah</h3>
          <div className="flex items-center gap-3">
            <QuantityPicker
              value={quantity}
              onChange={setQuantity}
              max={product.stock}
            />
            {isLowStock && (
              <span className="text-xs text-destructive">
                Sisa {product.stock}
              </span>
            )}
          </div>
        </div>

        <Separator />

        {/* Cek Ongkir */}
        <div className="bg-secondary/50 rounded-xl p-4">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Cek Ongkos Kirim
          </h3>
          <Select value={selectedCity} onValueChange={(v) => {
            setSelectedCity(v);
            setShowShipping(true);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kota..." />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {showShipping && selectedCity && (
            <div className="mt-3 space-y-2">
              {shippingOptions.slice(0, 3).map((opt) => (
                <div
                  key={opt.id}
                  className="flex items-center justify-between py-2 px-3 bg-white rounded-lg text-sm"
                >
                  <div>
                    <p className="font-medium">{opt.name}</p>
                    <p className="text-xs text-muted-foreground">{opt.estimate}</p>
                  </div>
                  <span className="font-medium">{formatPrice(opt.price)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="flex justify-around py-3 bg-secondary/30 rounded-xl">
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-5 w-5" />
            <span>Original</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
            <Truck className="h-5 w-5" />
            <span>Free Ongkir*</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
            <RotateCcw className="h-5 w-5" />
            <span>Tukar 7 Hari</span>
          </div>
        </div>

        {/* Description Accordion */}
        <div className="border rounded-xl">
          <button
            className="w-full flex items-center justify-between p-4"
            onClick={() => setShowDescription(!showDescription)}
          >
            <span className="font-medium">Deskripsi</span>
            {showDescription ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showDescription && (
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
          )}
        </div>

        {/* Specs Accordion */}
        <div className="border rounded-xl">
          <button
            className="w-full flex items-center justify-between p-4"
            onClick={() => setShowSpecs(!showSpecs)}
          >
            <span className="font-medium">Spesifikasi</span>
            {showSpecs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showSpecs && (
            <div className="px-4 pb-4 space-y-2">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex justify-between text-sm py-1 border-b last:border-0">
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 flex gap-3 z-40">
        <Button variant="outline" className="flex-1">
          + Keranjang
        </Button>
        <Button className="flex-1">
          Beli Sekarang
        </Button>
      </div>
    </div>
  );
}
