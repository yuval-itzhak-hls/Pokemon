import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

export const pokemonTabs = 
{ all: { key: "all" , value: "all pokemons" },
 mine: { key: "mine" , value: "my pokemons" } }

export function AppLayout() {
  
  const [activeTab, setActiveTab] = useState(pokemonTabs.all.value);
  const showMyPokemons = activeTab === pokemonTabs.mine.value;

  return (
    <div className="min-h-screen flex flex-col bg-bg-system px-16 py-16">
      <AppHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />                  
      <main className="flex-1 pt-16"> 
        <Outlet context={{ showMyPokemons }} />
      </main>
    </div>
  );
}
