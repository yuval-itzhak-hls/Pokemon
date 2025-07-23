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
  const [rowsPerPage, setRowsPerPage] = useState<number>(10); 

  const showMyPokemons: boolean = mode === "my"; 
  const pageTitle: string = showMyPokemons
    ? HomePageTitles.MyPokemons
    : HomePageTitles.AllPokemons;

  const { 
    pokemons, 
    page, 
    pageCount, 
    perPage, 
    setPage, 
    setPerPage, 
    totalItemsCount 
  } = usePokemonsData({
    showMyPokemons,
    searchTerm,
    sortOption,
    rowsPerPage: rowsPerPage, 
  });


  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setPage(1); 
  };

  const handleSortOptionChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
    setPage(1);
  };

  const handleActiveTabChange = (newActiveTab: ActiveTabType) => {
    setActiveTab(newActiveTab);
  };
  


  return (
    <div className="space-y-3" key={mode}>
      <HomePageHeader
        modeTitle={pageTitle}
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange} 
        activeTab={activeTab}
        onActiveTabChange={handleActiveTabChange} 
        sortOption={sortOption}
        onSortOptionChange={handleSortOptionChange}
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
            totalItemsCount={totalItemsCount} 
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