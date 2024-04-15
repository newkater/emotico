import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default: "bg-primary-dark text-neutral-50 shadow hover:bg-primary-dark-85",
        destructive: "bg-red-700 text-neutral-50 shadow-sm hover:bg-red-700/80",
        outline: "text-primary-dark border-2 border-primary-dark bg-white shadow-sm hover:bg-primary-dark hover:text-white",
        secondary: "border-2 border-primary-dark text-primary-dark bg-white shadow-sm hover:bg-fill-medium",
        ghost: "text-primary-dark hover:bg-neutral-100",
        link: "text-primary-dark underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-lg",
        icon: "h-9 w-9",
        icon8: "h-8 w-8",
        icon7: "h-7 w-7",        
        icon6: "h-6 w-6",
        empty: ""
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
