"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useIsDesktop } from "@/src/hooks";
import { DesktopProductDetail } from "@/src/components/desktop";
import { MobileProductDetail } from "@/src/components/mobile";
import { getProductBySlug, products } from "@/src/data/products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = getProductBySlug(id) || products.find((p) => p.id === id);
  const isDesktop = useIsDesktop();

  if (!product) {
    notFound();
  }

  return isDesktop ? (
    <DesktopProductDetail product={product} />
  ) : (
    <MobileProductDetail product={product} />
  );
}
