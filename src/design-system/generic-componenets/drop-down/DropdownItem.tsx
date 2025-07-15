import { SelectItem } from "@/components/ui/select";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import type { Options } from "./types";

type DropdownItemProps = {
  option: Options;
  disabled?: boolean; // If disabled state is passed down
};

export const DropdownItem = ({ option, disabled }: DropdownItemProps) => (
  <SelectItem
        key={option.value}
        value={option.value}
        disabled={option.disabled}
        className={clsx(
            "flex items-center justify-between w-full h-10 px-3",
            "cursor-pointer text-caption-regular"
        )}
        >
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 w-[160px]">
            {option.img && !disabled && (
                <Avatar className="h-7 w-7 bg-slate-100">
                <AvatarImage src={option.img} />
                </Avatar>
            )}
            <span>{option.label}</span>
            </div>

            {option.subLabel  && !disabled && (
            <span className="ml-2 justify-items-end text-body-bold">
                {option.subLabel}px
            </span>
            )}
        </div>
    </SelectItem>
);