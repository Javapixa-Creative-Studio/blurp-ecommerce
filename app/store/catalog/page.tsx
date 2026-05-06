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
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
