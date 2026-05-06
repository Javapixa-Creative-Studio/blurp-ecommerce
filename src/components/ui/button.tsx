import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-active rounded-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-sm",
        outline:
          "border border-hairline bg-white text-ink hover:bg-surface-soft hover:border-ink rounded-sm",
        secondary:
          "bg-surface-soft text-ink hover:bg-surface-strong rounded-sm",
        ghost: "hover:bg-surface-soft text-ink rounded-sm",
        link: "text-primary underline-offset-4 hover:underline",
        // Airbnb-style rounded pill button
        pill: "bg-primary text-white hover:bg-primary-active rounded-full",
        pillOutline: "border border-hairline bg-white text-ink hover:bg-surface-soft rounded-full",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4",
        icon: "h-10 w-10",
        iconSm: "h-8 w-8",
        iconLg: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }