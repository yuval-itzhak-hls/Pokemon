import { useState } from "react";
import { SearchInput } from "./SearchInput";
import { ClearButton } from "./ClearButton"; 

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
};

export const SearchBar = ({
  placeholder = "Search",
  value,
  onChange,
  className,
}: SearchBarProps) => {
  
  const [internal, setInternal] = useState("");
  const val = value ?? internal;

  const update = (v: string) => {
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };

  const clear = () => update("");

  return (
    <div className={`relative flex items-center w-full ${className ?? ""}`}>
      <SearchInput
        value={val}
        onChange={update}
        placeholder={placeholder}
      />
      {val && <ClearButton onClick={clear} />}
    </div>
  );
};