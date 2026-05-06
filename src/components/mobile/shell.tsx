import { MobileNavbar } from "./navbar";
import { MobileTabBar } from "./tab-bar";
import { ChatBubble } from "@/src/components/shared";

interface MobileShellProps {
  children: React.ReactNode;
  title?: string;
  hideTabBar?: boolean;
}

export function MobileShell({ children, title, hideTabBar }: MobileShellProps) {
  return (
    <div className="min-h-screen flex flex-col pb-16">
      <MobileNavbar title={title} />
      <main className="flex-1">{children}</main>
      {!hideTabBar && <MobileTabBar />}
      <ChatBubble />
    </div>
  );
}
