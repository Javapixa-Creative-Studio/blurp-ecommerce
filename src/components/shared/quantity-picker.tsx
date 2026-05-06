"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface QuantityPickerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityPicker({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantityPickerProps) {
  return (
    <div className={cn("inline-flex items-center border border-hairline rounded-full bg-white", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full hover:bg-surface-soft"
        onClick={() => value > min && onChange(value - 1)}
        disabled={value <= min}
        aria-label="Kurangi jumlah"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <div className="h-9 min-w-[2.5rem] px-1 flex items-center justify-center text-sm font-semibold tabular-nums">
        {value}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full hover:bg-surface-soft"
        onClick={() => value < max && onChange(value + 1)}
        disabled={value >= max}
        aria-label="Tambah jumlah"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
