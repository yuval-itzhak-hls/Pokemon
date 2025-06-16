
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/design-system/variants/buttonVariants"
import type { VariantProps } from "class-variance-authority"

interface GenericButtonProps extends VariantProps<typeof buttonVariants> {
  text: string
  onClick?: () => void
}

export const GenericButton: React.FC<GenericButtonProps> = ({
  type,
  size,
  text,
  onClick,
}) => {
  return (
    <Button onClick={onClick} className={buttonVariants({ type, size })}>
      {text}
    </Button>
  )
}
