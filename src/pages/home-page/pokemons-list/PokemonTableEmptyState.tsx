import { TableCell, TableRow } from "@/components/ui/table";
import { SearchX } from "lucide-react";

import { NoPokemonsFound } from "./pokemonListConstants";
import type { PokemonTableEmptyStateProps } from "./pokemonListConstants";

export const PokemonTableEmptyState = ({colSpan}: PokemonTableEmptyStateProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-[120px]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center justify-center w-[150px] h-[150px] rounded-full bg-primary-50 text-gray-500">
            <SearchX
              size={80}
              strokeWidth={1.5}
              color="#3B5AA6"
              className="text-current transform scale-x-[-1]"
            />
          </div>
          <p className="text-gray-600 text-lg">{NoPokemonsFound.Message}</p>
        </div>
      </TableCell>
    </TableRow>
  );
};