import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import closePokemonIcon from "@/assets/close-pokemon.png";
import type { Pokemon } from "@/hooks/usePokemonsData";
import rawPokemons from "../../data/pokemon.json";
import { PokemonDetailsPanel } from "./PokemonDetailsPanel";
import type {PokemonDetails} from "./PokemonDetailsPanel";

interface PokemonsListProps {
  pokemons: Pokemon[];
  page: number;
  pageCount: number;
  perPage: number;
  onPageChange: (p: number) => void;
  onPerPageChange: (n: number) => void;
}

export const PokemonsList: React.FC<PokemonsListProps> = ({
  pokemons,
  page,
  pageCount,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  const [selected, setSelected] = useState<PokemonDetails | null>(null);

  const closePanel = () => setSelected(null);

  return (
    <>
      <div className="w-full max-w-[1450px]  mx-auto overflow-y-auto rounded-1xl bg-card">
        <Table className="table-fixed text-body-regular [&_thead_tr>th]:text-body-bold [&_thead_tr>th]:text-black [&_thead_tr>th]:font-bold">
          <TableHeader className="bg-primary-50">
            <TableRow>
              <TableHead className="pl-[60px] w-[300px]">Pokemon name</TableHead>
              <TableHead className="w-[150px]">ID</TableHead>
              <TableHead className="w-[500px]">Description</TableHead>
              <TableHead className="w-[127px]">Power level</TableHead>
              <TableHead className="w-[127px]">HP level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pokemons.map(p => (
              <TableRow
                key={p.id}
                className="hover:bg-neutrals-100 cursor-pointer"
                onClick={() =>
                  setSelected({
                    id: p.id,
                    name: p.name,
                    image: p.image,
                    description: p.description,
                    height: p.height,
                    weight: p.weight,
                    category: p.category,
                    abilities: p.abilities,
                  })
                }
               >
                <TableCell>
                  <div className="flex items-center gap-2 truncate">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-11 w-11 rounded-full object-contain bg-slate-100"
                    />
                    <span>{p.name}</span>
                    {p.isMyPokemon && (
                      <img
                        src={closePokemonIcon}
                        alt="My Pokemon"
                        className="h-4 w-4 ml-2"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{`#${p.id}`}</TableCell>
                <TableCell className="max-w-[300px] pr-10 truncate">
                  {p.description}
                </TableCell>
                {p.powerLevel ? (
                <TableCell>{`Power level ${p.powerLevel}`}</TableCell>
                ) : (
                  <TableCell >{`-`}</TableCell>
                )}
                {p.hpLevel ? (
                <TableCell className="capitalize">{`${p.hpLevel} HP`}</TableCell>
                ) : (
                  <TableCell  >{`-`}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-3 text-caption-regular text-neutrals-600 h-11 border-t">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <span>Rows per page:</span>
            <select
              className="rounded-md bg-transparent p-1 focus:outline-none"
              value={perPage}
              onChange={e => {
                onPageChange(1);
                onPerPageChange(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 50].map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-caption-regular text-neutrals-600 whitespace-nowrap">
              {(page - 1) * perPage + 1}-
              {Math.min(page * perPage, pokemons.length)} of {rawPokemons.length}{" "}
              items
            </span>
            <Pagination>
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    aria-disabled={page === 1}
                    onClick={e => {
                      e.preventDefault();
                      if (page > 1) onPageChange(page - 1);
                    }}
                    className="[&>span]:sr-only"
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    aria-disabled={page === pageCount}
                    onClick={e => {
                      e.preventDefault();
                      if (page < pageCount) onPageChange(page + 1);
                    }}
                    className="[&>span]:sr-only"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      {selected && (
        <PokemonDetailsPanel
          pokemon={selected}
          isOpen={!!selected}
          onClose={closePanel}
        />
      )}
    </>
  );
};
