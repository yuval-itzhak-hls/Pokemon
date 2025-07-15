import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import clsx from "clsx";
import  { useState, type ReactNode } from "react";

type DropdownTooltipProps = {
  children: ReactNode;
  disabled: boolean;
  disabledMessage: string;
};

export const DropdownTooltip = ({ children, disabled, disabledMessage }: DropdownTooltipProps) => {
  const [openTooltip, setOpenTooltip] = useState(false);

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
            {children}
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
};