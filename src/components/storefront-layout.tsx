"use client";

import { useIsDesktop } from "@/src/hooks";
import { DesktopShell } from "@/src/components/desktop";
import { MobileShell } from "@/src/components/mobile";

interface StorefrontLayoutProps {
  children: React.ReactNode;
  desktopContent?: React.ReactNode;
  mobileContent?: React.ReactNode;
  mobileTitle?: string;
  hideMobileTabBar?: boolean;
}

export function StorefrontLayout({
  children,
  desktopContent,
  mobileContent,
  mobileTitle,
  hideMobileTabBar,
}: StorefrontLayoutProps) {
  const isDesktop = useIsDesktop();

  if (desktopContent && mobileContent) {
    if (isDesktop) {
      return <DesktopShell>{desktopContent}</DesktopShell>;
    }
    return (
      <MobileShell title={mobileTitle} hideTabBar={hideMobileTabBar}>
        {mobileContent}
      </MobileShell>
    );
  }

  if (isDesktop) {
    return <DesktopShell>{children}</DesktopShell>;
  }

  return (
    <MobileShell title={mobileTitle} hideTabBar={hideMobileTabBar}>
      {children}
    </MobileShell>
  );
}
