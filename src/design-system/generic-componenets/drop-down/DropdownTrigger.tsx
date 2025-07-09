import { SelectTrigger, SelectValue } from "@/components/ui/select";
import clsx from "clsx";

type DropdownTriggerProps = {
  placeholder: string;
};

export const DropdownTrigger = ({ placeholder }: DropdownTriggerProps) => (
  <SelectTrigger
    className={clsx(
      "relative flex items-center justify-center gap-4",
      "w-auto h-[38px] px-2",
      "border border-gray-300 rounded-lg",
      "bg-transparent hover:border-gray-400 focus:border-primary-tab-foreground focus:outline-none",
      "text-caption-regular"
    )}
  >
    <SelectValue placeholder={placeholder} />
  </SelectTrigger>
);