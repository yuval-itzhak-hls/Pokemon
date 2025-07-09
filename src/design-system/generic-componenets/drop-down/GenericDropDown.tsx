import { useState } from "react";
import { Select, SelectContent } from "@/components/ui/select";
import { DropdownTrigger } from "./DropdownTrigger";
import { DropdownSearch } from "./DropdownSearch";
import { DropdownItem } from "./DropdownItem";
import { DropdownTooltip } from "./DropdownTooltip";
import type { Options } from "./types";

export type GenericDropDownProps = {
  placeholder?: string;
  options: Options[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  className?: string;
  disabled?: boolean;
  disabledMessage?: string;
  isSearch?: boolean;
};

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
  const [search, setSearch] = useState("");
  const filtered = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DropdownTooltip disabled={disabled} disabledMessage={disabledMessage}>
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <DropdownTrigger placeholder={placeholder} />

        <SelectContent className={className}>
          {isSearch && <DropdownSearch search={search} onSearchChange={setSearch} />}

          {filtered.map((option) => (
            <DropdownItem key={option.value} option={option} disabled={disabled} />
          ))}
        </SelectContent>
      </Select>
    </DropdownTooltip>
  );
};