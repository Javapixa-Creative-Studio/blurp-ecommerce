"use client";

import { ProductCard } from "@/src/components/shared/product-card";
import { ProductCardSkeleton } from "@/src/components/shared/skeleton";
import { useSimulatedLoading } from "@/src/hooks/use-simulated-loading";
import type { Product } from "@/src/data/products";
import { cn } from "@/src/lib/utils";

interface ProductGridProps {
  products: Product[];
  className?: string;
  /** Skeleton placeholder count when loading. Defaults to products.length. */
  skeletonCount?: number;
  /** Optional simulated delay for the skeleton (ms). Defaults to 700ms. */
  simulateMs?: number;
  /** Wrap each card with extra classes (e.g. for animation). */
  itemClassName?: string;
}

/**
 * Renders a list of products with a built-in simulated loading state.
 * Layout/grid styling is owned by the parent — this component only renders
 * children directly into the parent grid via React fragments-ish style.
 *
 * NOTE: To preserve grid layout, this component renders cards as direct
 * children. Wrap it inside the parent `<div className="grid …">`.
 */
export function ProductGrid({
  products,
  className,
  skeletonCount,
  simulateMs = 700,
  itemClassName,
}: ProductGridProps) {
  const isLoading = useSimulatedLoading(simulateMs);
  const count = skeletonCount ?? products.length ?? 4;

  if (isLoading) {
    return (
      <div className={className} aria-busy="true">
        {Array.from({ length: count }).map((_, i) => (
          <div key={`sk-${i}`} className={cn(itemClassName)}>
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {products.map((p, idx) => (
        <div key={p.id} className={cn(itemClassName?.replace(/stagger-\d/, `stagger-${idx + 1}`))}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
