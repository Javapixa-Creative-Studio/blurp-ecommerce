"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useIsDesktop } from "@/src/hooks";
import { DesktopCatalog } from "@/src/components/desktop";
import { MobileCatalog } from "@/src/components/mobile";

function CatalogContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <DesktopCatalog category={category} />
  ) : (
    <MobileCatalog category={category} />
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
