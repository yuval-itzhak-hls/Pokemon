import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "rounded-[4px] font-normal text-sm leading-[22px] text-center align-middle font-mulish",
  {
    variants: {
      type: {
        primary:
          `
            bg-primary 
            text-primary-foreground 
            hover:bg-primary-hover 
            active:bg-primary-active 
            disabled:bg-primary-disabled 
            disabled:text-gray-400
            disabled:cursor-not-allowed
            focus:outline-none 
            focus:ring-0 
            focus:ring-transparent
            `,
        secondary:`
            bg-secondary 
            text-secondary-foreground 
            border border-secondary-border
            hover:bg-secondary-hover 
            active:bg-secondary-active 
            disabled:bg-secondary-disabled 
            disabled:text-gray-400
            disabled:cursor-not-allowed
            focus:outline-none 
            focus:ring-0 
            focus:ring-transparent
            `
      },
      size: {
        small: "px-3 py-1 text-sm", 
        medium: "px-4 py-[9px] text-sm min-w-[76px] h-[32px]", 
        large: "px-5 py-3 text-lg",
        wide: "px-4 py-1 w-[360px] h-[35px] text-sm rounded gap-1"
        }
    },
    defaultVariants: {
      type: "primary",
      size: "medium",
    },
  }
)

