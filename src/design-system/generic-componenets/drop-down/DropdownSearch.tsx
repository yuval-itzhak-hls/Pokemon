import { SearchBar } from "../search/SearchBar";

type DropdownSearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export const DropdownSearch = ({ search, onSearchChange }: DropdownSearchProps) => (
  <div className="px-2 py-2">
    <SearchBar
      placeholder={"Search"}
      value={search}
      onChange={onSearchChange}
      className="w-full"
    />
  </div>
);