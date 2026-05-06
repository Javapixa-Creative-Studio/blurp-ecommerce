"use client";

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
  const desktopNode = desktopContent && mobileContent ? desktopContent : children;
  const mobileNode = desktopContent && mobileContent ? mobileContent : children;

  return (
    <>
      <div className="hidden md:block">
        <DesktopShell>{desktopNode}</DesktopShell>
      </div>
      <div className="md:hidden">
        <MobileShell title={mobileTitle} hideTabBar={hideMobileTabBar}>
          {mobileNode}
        </MobileShell>
      </div>
    </>
  );
}
