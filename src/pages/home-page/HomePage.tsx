import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PokemonsList } from "./PokemonsList";
import { SearchBar } from "@/design-system/generic-componenets/SearchBar";
import { useDebounce } from "use-debounce";

export const HomePage: React.FC = () => {
  const { showMyPokemons } = useOutletContext<{ showMyPokemons: boolean }>();
  const title = showMyPokemons ? "My Pokemons" : "All Pokemons";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm] = useDebounce(searchTerm, 300);

  return (
    <div className="space-y-6">

      <div className="px-2">
        <header className="text-heading-lg-medium">{title}</header>
      </div>

      <div className="px-2 py-2">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search Pokemon"
          className="w-[294px] h-[38px] rounded-lg"
        />
      </div>

      <PokemonsList
        rowsPerPage={10}
        showMyPokemons={showMyPokemons}
        searchTerm={debouncedTerm}
      />
    </div>
  );
};

