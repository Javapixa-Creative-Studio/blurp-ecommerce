"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface ChatBubbleProps {
  className?: string;
}

export function ChatBubble({ className }: ChatBubbleProps) {
  return (
    <Button
      size="icon"
      className={cn(
        "fixed bottom-20 md:bottom-6 right-4 h-14 w-14 rounded-full shadow-lg",
        "bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90",
        "z-40",
        className
      )}
      onClick={() => {
        window.open("https://wa.me/6281234567890", "_blank");
      }}
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
}
