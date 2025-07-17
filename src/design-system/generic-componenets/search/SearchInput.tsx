// components/search-input.tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search",
  className,
}: SearchInputProps) => {
  return (
    <div className={`relative flex-grow ${className ?? ""}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          pl-10 pr-10 py-2 text-sm
          w-full
          rounded-lg
          bg-transparent border border-gray-300
          hover:border-gray-400
          focus:border-primary-tab-foreground
          focus:outline-none focus:ring-0
          transition-colors
        "
      />
    </div>
  );
};