import { useState, useEffect } from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import { AppHeader } from "./AppHeader";

export function AppLayout() {
  const [activeTab, setActiveTab] = useState("all pokemons");

  const location = useLocation();
  const isFightArena = !!matchPath("/fighting-arena-page", location.pathname);

  //whenever we enter or leave the arena, clear or reset the tab
  useEffect(() => {
    if (isFightArena) {
      setActiveTab("");          
    } else if (!activeTab) {
      //if we just left the arena, default back to All Pokemons
      setActiveTab("all pokemons");
    }
  }, [isFightArena]);

  const showMyPokemons = activeTab === "my pokemons";

  return (
    <div className="min-h-screen flex flex-col bg-bg-system px-12 py-12">
      <AppHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isFightArena={isFightArena}
      />
      <main className="flex-1 pt-16">
        <Outlet context={{ showMyPokemons }} />
      </main>
    </div>
  );
}
