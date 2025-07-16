
import  { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PokemonDetailsPanel } from "../pokemon-details-panel/PokemonDetailsPanel";
import { PokemonTableEmptyState } from "./PokemonTableEmptyState"; 
import { PokemonTableRow } from "./PokemonTableRow"; 
import { PokemonTablePagination } from "./PokemonTablePagination"; 
import type { PokemonDetails } from "../pokemon-details-panel/PokemonDetailsPanel";
import { PokemonTableHeaders } from "./pokemonListConstants";
import type { PokemonsListProps } from "./pokemonListConstants";

import rawPokemons from "../../../data/pokemon.json";


export const PokemonsList = (props: PokemonsListProps) => {
  
  const { pokemons, page, pageCount, perPage, onPageChange, onPerPageChange } = props;

  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetails | null>(null);

  const handleCloseDetailsPanel = (): void => setSelectedPokemonDetails(null);

  const handleSelectPokemon = (details: PokemonDetails): void => setSelectedPokemonDetails(details);

  return (
    <>
      <div className="w-full max-w-auto mx-auto overflow-y-auto rounded-1xl bg-card">
        <Table className="table-fixed text-body-regular [&_thead_tr>th]:text-body-bold [&_thead_tr>th]:text-black [&_thead_tr>th]:font-bold">
          <TableHeader className="bg-primary-50">
            <TableRow>
              <TableHead className="pl-[70px] w-[300px]">
                {PokemonTableHeaders.Name}
              </TableHead>
              <TableHead className="w-[150px]">
                {PokemonTableHeaders.Id}
              </TableHead>
              <TableHead className="w-[500px]">
                {PokemonTableHeaders.Description}
              </TableHead>
              <TableHead className="w-[120px]">
                {PokemonTableHeaders.PowerLevel}
              </TableHead>
              <TableHead className="w-[120px]">
                {PokemonTableHeaders.HpLevel}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TooltipProvider delayDuration={0}>
            <TableBody>
              {pokemons.length === 0 ? (
                <PokemonTableEmptyState colSpan={5} />
              ) : (
                pokemons.map((pokemon) => (
                  <PokemonTableRow
                    key={pokemon.id}
                    pokemon={pokemon}
                    onSelectPokemon={handleSelectPokemon}
                  />
                ))
              )}
            </TableBody>
          </TooltipProvider>
        </Table>

        <PokemonTablePagination
          currentPage={page}
          pageCount={pageCount}
          itemsPerPage={perPage}
          totalItems={rawPokemons.length} // Still using rawPokemons.length for total count
          onPageChange={onPageChange}
          onItemsPerPageChange={onPerPageChange}
        />
      </div>

      {selectedPokemonDetails && (
        <PokemonDetailsPanel
          pokemon={selectedPokemonDetails}
          isOpen={!!selectedPokemonDetails}
          onClose={handleCloseDetailsPanel}
        />
      )}
    </>
  );
};