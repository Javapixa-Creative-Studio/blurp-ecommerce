import { cn } from "@/src/lib/utils";

/**
 * Base skeleton block. Animates a soft pulse over a neutral surface.
 * Use as a building block for higher-level skeleton layouts.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse rounded-md bg-surface-strong/80",
        className
      )}
      {...props}
    />
  );
}

/** Skeleton matching the shape of `ProductCard`. */
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-md", className)} aria-hidden>
      <Skeleton className="aspect-square w-full rounded-md" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3 w-1/3 rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
        <Skeleton className="h-4 w-2/3 rounded mt-1" />
      </div>
    </div>
  );
}

/** Skeleton row for a horizontal/vertical list of products in a section. */
export function ProductCardSkeletonGrid({
  count = 4,
  className,
  itemClassName,
}: {
  count?: number;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={className} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} className={itemClassName} />
      ))}
    </div>
  );
}

/** Skeleton matching one cart line item (mobile/desktop friendly). */
export function CartItemSkeleton() {
  return (
    <div
      className="rounded-2xl border border-hairline bg-white p-3 md:p-4 flex gap-3 md:gap-4"
      aria-hidden
    >
      <Skeleton className="h-20 w-20 md:h-24 md:w-24 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/3 rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}

/** Generic line skeleton. */
export function LineSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-3 w-full rounded", className)} />;
}

/** Skeleton for a checkout summary line item. */
export function SummaryRowSkeleton() {
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/3 rounded" />
      </div>
      <Skeleton className="h-3 w-16 rounded" />
    </div>
  );
}

/** Skeleton matching the tracker timeline item layout. */
export function TimelineStepSkeleton() {
  return (
    <div className="flex gap-4" aria-hidden>
      <div className="flex flex-col items-center">
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="w-px flex-1 mt-1 h-12" />
      </div>
      <div className="space-y-2 pt-1 flex-1">
        <Skeleton className="h-4 w-1/2 rounded" />
        <Skeleton className="h-3 w-3/4 rounded" />
      </div>
    </div>
  );
}
