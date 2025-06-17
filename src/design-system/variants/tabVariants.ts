// design-system/variants/tabVariants.ts
import { cva } from "class-variance-authority"

export const tabVariants = cva(
  "px-4 py-2 text-sm font-medium text-center align-middle font-mulish transition-colors",
  {
    variants: {
      variant: {
        primaryTab: `
          bg-transparent 
          text-primaryTab-foreground 
          hover:bg-primaryTab-hover
          focus:outline-none 
          border-none
          data-[state=active]:bg-primaryTab-active 
          data-[state=active]:text-primaryTab-foreground
          data-[state=active]:font-bold 
          data-[state=active]:decoration-2 
        `,
        secondaryTab: `
          bg-transparent 
          text-secondaryTab-foreground 
          hover:bg-secondaryTab-hover
          focus:outline-none 
          border-none
          data-[state=active]:bg-secondaryTab-active 
          data-[state=active]:text-secondaryTab-foreground
          data-[state=active]:font-bold 
          data-[state=active]:underline 
          data-[state=active]:decoration-2 
          data-[state=active]:underline-offset-[6px]
        `,
      }
    },
    defaultVariants: {
      variant: "primaryTab",
    },
  }
)
