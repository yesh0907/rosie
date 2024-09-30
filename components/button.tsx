import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "rosie-inline-flex rosie-items-center rosie-justify-center rosie-whitespace-nowrap rosie-rounded-md rosie-text-sm rosie-font-medium rosie-ring-offset-background rosie-transition-colors rosie-focus-visible:outline-none rosie-focus-visible:ring-2 rosie-focus-visible:ring-ring rosie-focus-visible:ring-offset-2 rosie-disabled:pointer-events-none rosie-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rosie-bg-primary rosie-text-primary-foreground rosie-hover:bg-primary/90",
        destructive:
          "rosie-bg-destructive rosie-text-destructive-foreground rosie-hover:bg-destructive/90",
        outline:
          "rosie-border rosie-border-input rosie-bg-background rosie-hover:bg-accent rosie-hover:text-accent-foreground",
        secondary:
          "rosie-bg-secondary rosie-text-secondary-foreground rosie-hover:bg-secondary/80",
        ghost: "rosie-hover:bg-accent rosie-hover:text-accent-foreground",
        link: "rosie-text-primary rosie-underline-offset-4 rosie-hover:underline",
      },
      size: {
        default: "rosie-h-10 rosie-px-4 rosie-py-2",
        sm: "rosie-h-9 rosie-rounded-md rosie-px-3",
        lg: "rosie-h-11 rosie-rounded-md rosie-px-8",
        icon: "rosie-h-10 rosie-w-10",
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
