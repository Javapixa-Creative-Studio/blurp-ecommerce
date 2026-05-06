"use client";

import { DesktopHome } from "@/src/components/desktop";
import { MobileHome } from "@/src/components/mobile";

export default function HomePage() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopHome />
      </div>
      <div className="md:hidden">
        <MobileHome />
      </div>
    </>
  );
}
