"use client";

import { useIsDesktop } from "@/src/hooks";
import { DesktopCheckout } from "@/src/components/desktop";
import { MobileCheckout } from "@/src/components/mobile";

export default function CheckoutPage() {
  const isDesktop = useIsDesktop();

  return isDesktop ? <DesktopCheckout /> : <MobileCheckout />;
}
