
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/design-system/variants/buttonVariants"
import type { VariantProps } from "class-variance-authority"

type GenericButtonProps = VariantProps<typeof buttonVariants> & {
  text: string
  onClick?: () => void
  disabled?: boolean
}

export const GenericButton = ({
  type,
  size,
  text,
  disabled,
  onClick,
} : GenericButtonProps ) => {
  return (
    <Button 
    onClick={onClick} 
    disabled={disabled}
    className={buttonVariants({ type, size })}
    >
      {text}
    </Button>
  )
}
