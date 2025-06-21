import React from "react";
import logo from "@/assets/logo.png";
import { GenericButton } from "@/design-system/generic-componenets/GenericButton";
import { GenericTab, type TabItem } from "@/design-system/generic-componenets/GenericTab";


const headerTabs: TabItem[] = [
  { label: "All Pokemons", value: "all pokemons" },
  { label: "My Pokemons", value: "my pokemons" },
];

export const AppHeader: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 h-20 z-20 bg-white">
      <div className="flex w-full items-center justify-between gap-1 py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <img
            src={logo}
            alt="Pokemon"
            className="h-11 w-38 select-none"
            draggable={false}
          />

          <GenericTab
            variant="primaryTab"
            tabs={headerTabs}
            defaultValue="all pokemons"
          />
        </div>

        <GenericButton
          type="primary"
          size="small"
          text="Start a Fight"
          onClick={() => console.log("y")}
        />
      </div>
    </header>
  );
};

