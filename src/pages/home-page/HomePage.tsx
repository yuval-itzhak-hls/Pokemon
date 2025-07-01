// src/pages/HomePage.tsx
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { SearchBar } from "@/design-system/generic-componenets/SearchBar";
import { GenericDropDown } from "@/design-system/generic-componenets/GenericDropDown";
import type { Options } from "@/design-system/generic-componenets/GenericDropDown";
import GenericTab from "@/design-system/generic-componenets/GenericTab";
import type { TabItem } from "@/design-system/generic-componenets/GenericTab";

import { usePokemonsData } from "@/hooks/usePokemonsData";
import type { SortOption } from "@/hooks/usePokemonsData";

import { PokemonsList } from "./PokemonsList";
import { PokemonCards } from "./PokemonCards";

const headerTabs: TabItem[] = [
  { label: "List", value: "list", icon: "list" },
  { label: "Card", value: "card", icon: "cards" },
];

export const HomePage: React.FC = () => {
  const { showMyPokemons } = useOutletContext<{ showMyPokemons: boolean }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("alpha-asc");
  const [activeTab, setActiveTab] = useState<"list" | "card">("list");

  const title = showMyPokemons ? "My Pokemons" : "All Pokemons";

  const {
    pokemons,
    page,
    pageCount,
    perPage,
    setPage,
    setPerPage,
  } = usePokemonsData({
    showMyPokemons,
    searchTerm,
    sortOption,
    rowsPerPage: 10,
  });

  const sortOptions: Options[] = [
    { value: "alpha-asc",  label: "Alphabetical A-Z" },
    { value: "alpha-desc", label: "Alphabetical Z-A" },
    { value: "power-asc",  label: "Power (Low to high)" },
    { value: "power-desc", label: "Power (High to low)" },
    { value: "hp-asc",     label: "HP (Low to high)" },
    { value: "hp-desc",    label: "HP (High to low)" },
  ];

  return (
    <div className="space-y-3">

      <div className="px-4">
        <h2 className="text-heading-xl-medium text-gray-800">{title}</h2>
      </div>


    <div className="px-4 py-1 flex items-center gap-4 ">
        <div className="w-[294px]">
            <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search Pokemon"
            className="w-full rounded-lg"
            />
        </div>

        <GenericTab
        variant="secondaryTab"
        tabs={headerTabs}
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "list" | "card")}
        />

        <div className="ml-auto">
            <GenericDropDown
            placeholder="Sort by"
            options={sortOptions}
            value={sortOption}
            onValueChange={(v) => setSortOption(v as SortOption)}
            className="w-full"
            />
        </div>
    </div>


      {/* Main content */}
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
  );
};
