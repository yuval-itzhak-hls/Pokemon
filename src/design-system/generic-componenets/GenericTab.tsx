import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { tabVariants } from "@/design-system/variants/tabVariants"
import type { VariantProps } from "class-variance-authority"
import clsx from "clsx"
import { Star } from "lucide-react"

interface TabProps extends VariantProps<typeof tabVariants> {
  text: string
  onClick?: () => void
}

export const GenericTab: React.FC<TabProps> = ({
  text,
  variant,
  onClick,
}) => {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(prev => !prev)
    onClick?.()
  }

  return (
    <Button
      onClick={handleClick}
      className={clsx(tabVariants({ variant, active }))}
    >
      {variant === "secondaryTab" && <Star className="w-4 h-4 mr-1" />}
      {text}
    </Button>
  )
}
