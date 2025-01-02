import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed",
  variants: {
    variant: {
      primary: "bg-lime-300 text-lime-950 hove:bg-lime-400 disabled:bg-lime-300/70",
      secondary: "bg-zinc-800  hover:bg-zinc-70 hover:bg-zinc-700",
    },
    size: {
      default: "py-2",
      full: "w-full h-11",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface buttonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({ children, variant, size, ...props }: buttonProps) {
  return (
    <button className={buttonVariants({ variant, size })} {...props}>
      {children}
    </button>
  );
}
