import * as SliderPrimitive from "@radix-ui/react-slider"
import * as React from "react"

import { cn } from "~/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "rosie-relative rosie-flex rosie-w-full rosie-touch-none rosie-select-none rosie-items-center",
      className
    )}
    {...props}>
    <SliderPrimitive.Track className="rosie-relative rosie-h-2 rosie-w-full rosie-grow rosie-overflow-hidden rosie-rounded-full rosie-bg-secondary">
      <SliderPrimitive.Range className="rosie-absolute rosie-h-full rosie-bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="rosie-block rosie-h-5 rosie-w-5 rosie-rounded-full rosie-border-2 rosie-border-primary rosie-bg-background rosie-ring-offset-background rosie-transition-colors rosie-focus-visible:outline-none rosie-focus-visible:ring-2 rosie-focus-visible:ring-ring rosie-focus-visible:ring-offset-2 rosie-disabled:pointer-events-none rosie-disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
