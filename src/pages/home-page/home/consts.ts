
import type { TabItem } from "@/design-system/generic-componenets/tab/types";
import type { Options } from "@/design-system/generic-componenets/drop-down/types";
import type { SortOption } from "@/hooks/usePokemonsData"; 


export const HeaderTabsConfig: TabItem[] = [
  { label: "List", value: "list", icon: "list" },
  { label: "Card", value: "card", icon: "cards" },
];


export const HomePageTitles = {
  MyPokemons: "My Pokemons",
  AllPokemons: "All Pokemons",
} as const;


export const PokemonSortOptions: Options<SortOption>[] = [
  { value: "alpha-asc", label: "Alphabetical A-Z" },
  { value: "alpha-desc", label: "Alphabetical Z-A" },
  { value: "power-asc", label: "Power (Low to high)" },
  { value: "power-desc", label: "Power (High to low)" },
  { value: "hp-asc", label: "HP (Low to high)" },
  { value: "hp-desc", label: "HP (High to low)" },
];


export const SearchBarPlaceholder = "Search Pokemon";


export const DropdownPlaceholder = "Sort by";