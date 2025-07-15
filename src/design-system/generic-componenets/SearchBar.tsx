import React, { useState } from "react";
import { Input } from "@/components/ui/input";    
import { Search, X } from "lucide-react";



interface SearchBarProps {
  placeholder?: string;
  value?: string;                        
  onChange?: (v: string) => void;                        
  className?: string;                     
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  value,
  onChange,
  className,
}) => {
   const [internal, setInternal] = useState("");
   const val = value ?? internal;

   const update = (v: string) => {
     if (value === undefined) setInternal(v);
     onChange?.(v);
   };

   const clear = () => update("");

  return (
    <div className={`relative w-full ${className ?? ""}`}>
   
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

      <Input
        value={val}
        placeholder={placeholder}
        onChange={(e) => update(e.target.value)}
        className="
          pl-10 pr-10 py-2 text-sm
          bg-transparent border border-gray-300
          hover:border-gray-400
          focus:border-primary-tab-foreground
          focus:outline-none focus:ring-0
          transition-colors
        "
      />

      {val && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
