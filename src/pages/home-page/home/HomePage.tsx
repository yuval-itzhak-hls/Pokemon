import { useState } from "react";
import { usePokemonsData } from "@/hooks/usePokemonsData";
import type { SortOption } from "@/hooks/usePokemonsData";
import { PokemonsList } from "../pokemons-list/PokemonsList"; 
import { PokemonCards } from "../pokemons-card/PokemonCards";

import {HomePageTitles} from "./consts";
import type { HomePageProps, ActiveTabType } from "./types";
import { HomePageHeader } from "./HomePageHeader";


export const HomePage = (props: HomePageProps) => {
  const { mode } = props;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("alpha-asc");
  const [activeTab, setActiveTab] = useState<ActiveTabType>("list"); 

  const showMyPokemons: boolean = mode === "my"; 
  const pageTitle: string = showMyPokemons
    ? HomePageTitles.MyPokemons
    : HomePageTitles.AllPokemons;

  const { pokemons, page, pageCount, perPage, setPage, setPerPage } =
    usePokemonsData({
      showMyPokemons,
      searchTerm,
      sortOption,
      rowsPerPage: 10,
    });

  return (
    <div className="space-y-3" key={mode}>
      <HomePageHeader
        modeTitle={pageTitle}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        activeTab={activeTab}
        onActiveTabChange={setActiveTab}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
      />

      <div className="px-4">
        {activeTab === "list" ? (
          <PokemonsList
            pokemons={pokemons}
            page={page}
            pageCount={pageCount}
            perPage={perPage}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />
        ) : (
          <PokemonCards
            showMyPokemons={showMyPokemons}
            searchTerm={searchTerm}
            sortOption={sortOption}
          />
        )}
      </div>
    </div>
  );
};