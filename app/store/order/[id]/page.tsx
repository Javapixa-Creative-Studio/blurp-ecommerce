"use client";

import { use } from "react";
import { useIsDesktop } from "@/src/hooks";
import { DesktopOrderSuccess } from "@/src/components/desktop";
import { MobileOrderSuccess } from "@/src/components/mobile";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderPage({ params }: OrderPageProps) {
  const { id } = use(params);
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <DesktopOrderSuccess orderId={id} />
  ) : (
    <MobileOrderSuccess orderId={id} />
  );
}
