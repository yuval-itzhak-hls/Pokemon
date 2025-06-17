import { cva } from "class-variance-authority"

export const tabVariants = cva(
  "px-4 py-2 text-sm font-medium",
  {
    variants: {
      variant: {
        primaryTab: `
          bg-transparent 
          text-primaryTab-foreground 
          hover:bg-primaryTab-hover
          focus:outline-none 
          focus:ring-0 
          border-none
        `,
        secondaryTab: `
          bg-transparent 
          text-gray-600 
          hover:bg-gray-100
          focus:outline-none 
          focus:ring-0 
          border-none
        `,
      },
      active: {
        true: "bg-primaryTab-active font-bold",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primaryTab",
      active: false,
    },
  }
)
