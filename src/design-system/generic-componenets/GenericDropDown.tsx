import { useState } from "react";
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
import { SearchBar } from "./SearchBar";
import clsx from "clsx";

export type Options = {
  value: string;
  label: string;
  subLabel?: number;
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
  isSearch?: boolean;
}

export const GenericDropDown = ({
  placeholder = "Choose…",
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  disabled = false,
  isSearch = false,
  disabledMessage = "You have already switched a Pokemon in this battle.",
}: GenericDropDownProps) => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const showTooltip = () => {
    if (!disabled) return;
    setOpenTooltip(true);
    setTimeout(() => setOpenTooltip(false), 1500);
  };

  const handleOpenChange = (open: boolean) => {
    if (disabled) setOpenTooltip(open);
  };

  const [search, setSearch] = useState("")
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  )

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
                  "relative flex items-center justify-center gap-4",
                  "w-auto h-[38px] px-2",
                  "border border-gray-300 rounded-lg",
                  "bg-transparent hover:border-gray-400 focus:border-primary-tab-foreground focus:outline-none",
                  "text-caption-regular"
                )}
              >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className={className}>
              { isSearch && (
                <div className="px-2 py-2">
                <SearchBar
                  placeholder={"Search"}
                  value={search}
                  onChange={setSearch}
                  className="w-full"
                />
              </div>
              )}             

              {filtered.map(opt => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={clsx(
                    "flex items-center justify-between w-full h-10 px-3",
                    "cursor-pointer text-caption-regular"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0 w-[160px]">
                      {opt.img && !disabled && (
                        <Avatar className="h-7 w-7 bg-slate-100">
                          <AvatarImage src={opt.img} />
                        </Avatar>
                      )}
                      <span>{opt.label}</span>
                    </div>

                    {opt.subLabel  && !disabled && (
                      <span className="ml-2 justify-items-end text-body-bold">
                        {opt.subLabel}px
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
            </Select>
          </div>
        </TooltipTrigger>

        <TooltipContent
          side="top"
          align="start"
          sideOffset={6}
          className={clsx(
            "bg-gray-800 text-body-regular text-white rounded shadow-md px-3 py-2 max-w-xs"
          )}
        >
          {disabledMessage}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
