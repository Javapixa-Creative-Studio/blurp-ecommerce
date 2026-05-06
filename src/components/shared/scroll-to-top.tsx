"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToTopOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    // Handle both window scrolling and document scrolling element.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.scrollingElement?.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}

