import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { SearchBar } from "@/design-system/generic-componenets/SearchBar";
import { GenericDropDown} from "@/design-system/generic-componenets/GenericDropDown";
import type { Options } from "@/design-system/generic-componenets/GenericDropDown";
import { usePokemonsData } from "@/hooks/usePokemonsData";
import type { SortOption } from "@/hooks/usePokemonsData";
import { PokemonsList } from "./PokemonsList";

export const HomePage: React.FC = () => {
  const { showMyPokemons } = useOutletContext<{ showMyPokemons: boolean }>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("alpha-asc");

  const title = showMyPokemons ? "My Pokemons" : "All Pokemons";

  //pull filtered, searched, sorted and paginated data
  const { pokemons, page, pageCount, perPage, setPage, setPerPage } =
    usePokemonsData({
      showMyPokemons,
      searchTerm,
      sortOption,
      rowsPerPage: 10,
    });

  const sortOptions: Options[] = [
    { value: "alpha-asc",  label: "Alphabetical A-Z" },
    { value: "alpha-desc", label: "Alphabetical Z-A" },
    { value: "power-asc",  label: "Power (High to low)" },
    { value: "power-desc", label: "Power (Low to high)" },
    { value: "hp-asc",     label: "HP (High to low)" },
    { value: "hp-desc",    label: "HP (Low to high)" },
  ];

  return (
    <div className="space-y-6">
      <div className="px-2">
        <h2 className="text-heading-xl-medium text-gray-800">{title}</h2>
      </div>

      <div className="px-2 py-2 flex items-center justify-between">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search Pokemon"
          className="w-[290px] rounded-lg "
        />

        <GenericDropDown
        placeholder="Sort by"
        options={sortOptions}
        value={sortOption}
        onValueChange={(v: string) => setSortOption(v as SortOption)}
        className="w-[175px]"
        />
      </div>

      <PokemonsList
        pokemons={pokemons}
        page={page}
        pageCount={pageCount}
        perPage={perPage}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
      />
    </div>
  );
};

