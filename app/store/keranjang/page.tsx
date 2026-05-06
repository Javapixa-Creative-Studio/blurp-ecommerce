"use client";

import { useIsDesktop } from "@/src/hooks";
import { DesktopCart } from "@/src/components/desktop";
import { MobileCart } from "@/src/components/mobile";

export default function KeranjangPage() {
  const isDesktop = useIsDesktop();

  return isDesktop ? <DesktopCart /> : <MobileCart />;
}
