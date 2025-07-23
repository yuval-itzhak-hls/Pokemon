// src/components/pokemons-list/types.ts
import type { Pokemon } from "@/hooks/usePokemonsData";
import type { PokemonDetails } from "../pokemon-details-panel/PokemonDetailsPanel";


export type PokemonsListProps = {
  pokemons: Pokemon[];
  page: number;
  pageCount: number;
  perPage: number;
  onPageChange: (newPage: number) => void;
  onPerPageChange: (newPerPage: number) => void;
  totalItemsCount: number; 
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