import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";

export type Options = {
  value: string;
  label: string;
  img?: string;
  disabled?: boolean;
};

interface GenericDropDownProps {
  placeholder?: string;
  options: Options[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  className?: string;
  disabled?: boolean;
  disabledMessage?: string;
}

export function GenericDropDown({
  placeholder = "Choose…",
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  disabled = false,
  disabledMessage = "You have already switched a Pokémon in this battle.",
}: GenericDropDownProps) {
  const [openTooltip, setOpenTooltip] = React.useState(false);

  const showTooltip = () => {
    if (!disabled) return;
    setOpenTooltip(true);
    setTimeout(() => setOpenTooltip(false), 1500);
  };

  const handleOpenChange = (open: boolean) => {
    if (disabled) setOpenTooltip(open);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip
        open={disabled ? openTooltip : false}    
        onOpenChange={handleOpenChange}
      >
        <TooltipTrigger asChild>
          <div onClick={showTooltip}>
            <Select
              value={value}
              defaultValue={defaultValue}
              onValueChange={onValueChange}
              disabled={disabled}
            >
              <SelectTrigger
                className={clsx(
                "flex items-center justify-between gap-4",  
                "w-[109px] h-[38px]",                         
                "px-3 py-2",                          
                "border border-gray-300 rounded-lg",       
                "bg-transparent hover:border-gray-400 focus:border-primary-tab-foreground focus:outline-none",
                "font-mulish font-normal text-[12px] leading-[22px] tracking-[0] text-center",
                className
                )}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>


              <SelectContent>
                {options.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className="flex gap-2 items-center py-2 pr-8 pl-3 cursor-pointer"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={opt.img} />
                    </Avatar>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TooltipTrigger>

        <TooltipContent
          side="right"
          align="center"
          className="bg-gray-800 text-white text-sm rounded px-3 py-2 max-w-xs shadow-md"
        >
          {disabledMessage}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
