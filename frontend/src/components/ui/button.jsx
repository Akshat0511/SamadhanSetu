import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90",

        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",

        outline:
          "border border-border bg-surface shadow-soft hover:bg-accent hover:text-accent-foreground",

        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",

        ghost:
          "hover:bg-accent hover:text-accent-foreground",

        link:
          "text-primary underline-offset-4 hover:underline",

        hero:
          "bg-hero-gradient text-primary-foreground shadow-soft hover:shadow-lift hover:-translate-y-0.5",

        ai:
          "bg-ai text-ai-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5",

        emerald:
          "bg-emerald text-emerald-foreground shadow-soft hover:brightness-110",

        industry:
          "bg-industry text-industry-foreground shadow-soft hover:brightness-105",

        glass:
          "glass-dark text-primary-foreground hover:bg-white/15",

        subtle:
          "bg-primary-soft text-primary hover:bg-primary/15",
      },

      size: {
        default:
          "h-10 px-4 py-2",

        sm:
          "h-8 rounded-lg px-3 text-xs",

        lg:
          "h-12 rounded-xl px-7 text-[0.95rem]",

        icon:
          "h-10 w-10 rounded-xl",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export {
  Button,
  buttonVariants,
};

