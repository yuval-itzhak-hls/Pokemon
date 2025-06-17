import React from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { tabVariants } from "@/design-system/variants/tabVariants"
import type { VariantProps } from "class-variance-authority"
import clsx from "clsx"
import { List, CreditCard } from "lucide-react"

interface TabItem {
  label: string
  value: string
  icon?: "list" | "cards"
}

interface GenericTabProps extends VariantProps<typeof tabVariants> {
  tabs: TabItem[]
  defaultValue?: string
}

export const GenericTab: React.FC<GenericTabProps> = ({
  tabs,
  defaultValue,
  variant = "primaryTab",
}) => {
  const renderIcon = (type?: string) => {
    if (type === "list") return <List className="w-4 h-4 mr-1" />
    if (type === "cards") return <CreditCard className="w-4 h-4 mr-1" />
    return null
  }

  return (
    <Tabs defaultValue={defaultValue ?? tabs[0]?.value} className="w-full">
      <TabsList className="flex gap-2 p-1 bg-transparent">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={clsx(tabVariants({ variant }), "inline-flex items-center")}
          >
            {renderIcon(tab.icon)}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

    </Tabs>
  )
}
