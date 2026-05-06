import { MobileNavbar } from "./navbar";
import { ChatBubble } from "@/src/components/shared";

interface MobileShellProps {
  children: React.ReactNode;
  title?: string;
}

export function MobileShell({ children, title }: MobileShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <MobileNavbar title={title} />
      <main className="flex-1">{children}</main>
      <ChatBubble />
    </div>
  );
}
