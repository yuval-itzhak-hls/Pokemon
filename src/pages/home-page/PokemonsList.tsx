import React, { useMemo, useState } from "react";
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

import rawPokemons from "../../data/pokemon.json";


interface RawPokemon {
  id: number;
  name: { english: string };
  description: string;
  base: { HP: number };
  image: {
    thumbnail?: string;
    sprite: string;
  };
}

export interface Pokemon {
  id: string;        
  name: string;     
  description: string;
  powerLevel: string;  
  hpLevel: string;     
  image: string;

}


const POKEMONS: Pokemon[] = (rawPokemons as RawPokemon[]).map((p) => {
  const paddedId = p.id.toString().padStart(4, "0");
  return {
    id: paddedId,
    name: p.name.english,
    description: p.description,
    powerLevel: `Power level ${p.id}`,
    hpLevel: `${p.base?.HP} HP`,
    image: p.image.thumbnail ?? p.image.sprite,
  };
});

export interface PokemonsListProps {
  rowsPerPage?: number;
}

export const PokemonsList: React.FC<PokemonsListProps> = () => {
  const rowsPerPage = 10 
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(rowsPerPage);

  const pageCount = Math.ceil(POKEMONS.length / perPage);

  const slice = useMemo(() => {
    const start = (page - 1) * perPage;
    return POKEMONS.slice(start, start + perPage);
  }, [page, perPage]);

  return (
    <div className="w-full max-w-[1376px] mx-auto overflow-y-auto rounded-1xl bg-card ">
      <Table className="table-fixed text-body-regular [&_thead_tr>th]:text-body-bold [&_thead_tr>th]:text-black [&_thead_tr>th]:font-bold">
        <TableHeader className="bg-primary-50">
          <TableRow>
            <TableHead className="w-[408px]">Pokemon name</TableHead>
            <TableHead className="w-[170px]">ID</TableHead>
            <TableHead className="w-[544px]">Description</TableHead>
            <TableHead className="w-[127px]">Power level</TableHead>
            <TableHead className="w-[127px]">HP level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slice.map((p) => (
            <TableRow key={p.id} className="hover:bg-muted/30">
              <TableCell>
                <div className="flex items-center gap-2 truncate">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-10 w-10 rounded-md border object-contain"
                  />
                  <span>{p.name}</span>
                </div>
              </TableCell>
              <TableCell>{`#${p.id}`}</TableCell>
              <TableCell className="max-w-[420px] truncate">{p.description}</TableCell>
              <TableCell>{p.powerLevel}</TableCell>
              <TableCell>{p.hpLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination row */}
      <div className="flex items-center justify-between px-4 py-3 text-caption-regular text-neutrals-600 h-11 border">
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span>Rows per page:</span>
          <select
            className="rounded-md bg-transparent p-1 focus:outline-none"
            value={perPage}
            onChange={(e) => {
              setPage(1);
              setPerPage(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 50 ].map((n) => (
              <option key={n} value={n} className="text-foreground">
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-8">
            <span className="text-caption-regular text-neutrals-600 whitespace-nowrap">
                {(page - 1) * perPage + 1}-{Math.min(page * perPage, POKEMONS.length)} of {POKEMONS.length} items
            </span>

            <Pagination>
            <PaginationContent className="gap-1">
                <PaginationItem>
                <PaginationPrevious
                    href="#"
                    aria-disabled={page === 1}
                    onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                    }}
                    className="[&>span]:sr-only"
                />
                </PaginationItem>
                <PaginationItem>
                <PaginationNext
                    href="#"
                    aria-disabled={page === pageCount}
                    onClick={(e) => {
                    e.preventDefault();
                    if (page < pageCount) setPage(page + 1);
                    }}
                    className="[&>span]:sr-only"
                />
                </PaginationItem>
            </PaginationContent>
            </Pagination>
        </div>
      </div>
    </div>
  );
};

export default PokemonsList;
