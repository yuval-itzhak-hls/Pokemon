import type { Pokemon } from "@/hooks/usePokemonsData";
import type { PokemonDetails } from "../pokemon-details-panel/PokemonDetailsPanel";


export type PokemonsListProps = {
  pokemons: Pokemon[];
  page: number;
  pageCount: number;
  perPage: number;
  onPageChange: (newPage: number) => void;
  onPerPageChange: (newPerPage: number) => void;
};


export type PokemonTableRowProps = {
  pokemon: Pokemon;
  onSelectPokemon: (details: PokemonDetails) => void;
};


export type PokemonTableEmptyStateProps = {
  colSpan: number;
};


export type PokemonTablePaginationProps = {
  currentPage: number;
  pageCount: number;
  itemsPerPage: number;
  totalItems: number; // Represents total items for display text
  onPageChange: (newPage: number) => void;
  onItemsPerPageChange: (newItemsPerPage: number) => void;
};


export const PokemonTableHeaders = {
  Name: "Pokemon name",
  Id: "ID",
  Description: "Description",
  PowerLevel: "Power level",
  HpLevel: "HP level",
} as const;


export const NoPokemonsFound = {
  Message: "No Pokemons were found",
  IconAltText: "No results icon",
} as const;


export const PaginationTexts = {
  RowsPerPage: "Rows per page:",
  PreviousPage: "Previous page",
  NextPage: "Next page",
  NoItemsFound: "0-0 of 0 items",
  ItemsLabel: "items",
} as const;


export const ItemsPerPageOptions = [10, 20, 30, 50] as const;