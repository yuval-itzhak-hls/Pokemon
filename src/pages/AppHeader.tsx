import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { GenericButton } from "@/design-system/generic-componenets/button/GenericButton";
import { GenericTab } from "@/design-system/generic-componenets/tab/GenericTab";
import { usePokemonsData } from "@/hooks/usePokemonsData";
import type { TabItem } from "@/design-system/generic-componenets/tab/types";
import { ChoosePokemonBattlePanel } from "./home-page/choose-pokemon-panel/ChoosePokemonBattlePanel";

const headerTabs: TabItem[] = [
  { label: "All Pokemons", value: "all pokemons" },
  { label: "My Pokemons", value: "my pokemons" },
];

export type AppHeaderProps = {
  activeTab: string;
  onTabChange: (val: string) => void;
};

export const AppHeader = ({ activeTab, onTabChange }: AppHeaderProps) => {
  const [isBattleOpen, setBattleOpen] = useState(false);
  const navigate = useNavigate();

  const { pokemons: myPokemons } = usePokemonsData({
    showMyPokemons: true,
    searchTerm: "",
    sortOption: "alpha-asc",
    rowsPerPage: 1000,
  });

  const handleTabChange = (val: string) => {
    onTabChange(val);
  };

  const handleSignOut = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("No access token found.");
      return;
    }
    try {
      await fetch("http://localhost:3000/users/signout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      });
      localStorage.removeItem("accessToken");
      navigate("/login"); 
    } catch (err) {
      alert("Sign out failed.");
    }
  };

  return (
    <>
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
              value={activeTab}
              onValueChange={handleTabChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <GenericButton
              type="primary"
              size="small"
              text="Start a Fight"
              onClick={() => setBattleOpen(true)}
            />
            <GenericButton
              type="secondary"
              size="small"
              text="Sign Out"
              onClick={handleSignOut}
            />
          </div>
        </div>
      </header>

      <ChoosePokemonBattlePanel
        myPokemons={myPokemons}
        isOpen={isBattleOpen}
        onClose={() => setBattleOpen(false)}
      />
    </>
  );
};