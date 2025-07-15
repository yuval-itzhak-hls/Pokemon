import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import { TabIcon } from "./TabIcon"; 

import type { VariantProps } from "class-variance-authority";
import { tabVariants } from "@/design-system/variants/tabVariants";
import type { TabItem } from "./types";


export type GenericTabProps = VariantProps<typeof tabVariants> & {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
};

export const GenericTab = ({
  tabs, 
  ...props 
}: GenericTabProps) => {

  const componentVariant = props.variant ?? "primaryTab";

  return (
    <Tabs
      value={props.value}
      defaultValue={props.defaultValue ?? tabs[0]?.value}
      onValueChange={props.onValueChange}
      className="w-auto"
    >
      <TabsList className="flex gap-2 p-1 bg-transparent">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={clsx(tabVariants({ variant: componentVariant }), "inline-flex items-center rounded-sm")}
          >
            <TabIcon iconType={tab.icon} />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};