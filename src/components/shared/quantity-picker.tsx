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
    <div className={cn("inline-flex items-center border rounded-lg", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-none rounded-l-lg"
        onClick={() => value > min && onChange(value - 1)}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <div className="h-9 w-12 flex items-center justify-center text-sm font-medium border-x">
        {value}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-none rounded-r-lg"
        onClick={() => value < max && onChange(value + 1)}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
