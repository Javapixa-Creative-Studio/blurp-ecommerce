import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Product } from "@/src/data/products";
import { cn, formatPrice, calculateDiscount } from "@/src/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : null;

  return (
    <Card className={cn("group overflow-hidden border-border/50 hover:border-border hover:shadow-md transition-all duration-300", className)}>
      <Link href={`/store/product/${product.slug}`}>
        <div className="relative aspect-square bg-secondary overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            {product.name}
          </div>
          
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground">BARU</Badge>
            )}
            {discount && (
              <Badge variant="destructive">-{discount}%</Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              + Keranjang
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/store/product/${product.slug}`}>
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary/80 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <span className="text-amber-500">★</span>
            <span>{product.rating}</span>
            <span>({product.reviewCount})</span>
          </div>

          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-semibold text-base">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
