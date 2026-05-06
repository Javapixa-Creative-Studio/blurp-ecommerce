"use client";

import { useIsDesktop } from "@/src/hooks";
import { DesktopHome } from "@/src/components/desktop";
import { MobileHome } from "@/src/components/mobile";

export default function HomePage() {
  const isDesktop = useIsDesktop();

  return isDesktop ? <DesktopHome /> : <MobileHome />;
}
