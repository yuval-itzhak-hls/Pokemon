import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

export function AppLayout() {
  const [activeTab, setActiveTab] = useState("all pokemons");
  const showMyPokemons = activeTab === "my pokemons";

  return (
    <div className="min-h-screen flex flex-col bg-bg-system px-12 py-12">
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
