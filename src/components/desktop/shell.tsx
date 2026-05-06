import { DesktopNavbar } from "./navbar";
import { DesktopFooter } from "./footer";
import { ChatBubble } from "@/src/components/shared";

interface DesktopShellProps {
  children: React.ReactNode;
}

export function DesktopShell({ children }: DesktopShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <DesktopNavbar />
      <main className="flex-1">{children}</main>
      <DesktopFooter />
      <ChatBubble />
    </div>
  );
}
