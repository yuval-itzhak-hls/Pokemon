import React, { createContext, useContext, useState, useEffect } from "react";
import type { Pokemon } from "@/hooks/usePokemonsData";

interface BattleContextValue {
  userPokemon: Pokemon | null;
  opponentPokemon: Pokemon | null;
  setBattle: (user: Pokemon, opponent: Pokemon) => void;
  clearBattle: () => void;
}

const BattleContext = createContext<BattleContextValue | undefined>(undefined);

export const BattleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userPokemon, setUserPokemon] = useState<Pokemon | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("battle");
    if (stored) {
      try {
        const { user, opponent } = JSON.parse(stored) as { user: Pokemon; opponent: Pokemon };
        setUserPokemon(user);
        setOpponentPokemon(opponent);
      } catch {
        localStorage.removeItem("battle");
      }
    }
  }, []);

  const setBattle = (user: Pokemon, opponent: Pokemon) => {
    setUserPokemon(user);
    setOpponentPokemon(opponent);
    localStorage.setItem("battle", JSON.stringify({ user, opponent }));
  };

  const clearBattle = () => {
    setUserPokemon(null);
    setOpponentPokemon(null);
    localStorage.removeItem("battle");
  };

  return (
    <BattleContext.Provider value={{ userPokemon, opponentPokemon, setBattle, clearBattle}}>
      {children}
    </BattleContext.Provider>
  );
};

export function useBattle() {
  const context = useContext(BattleContext);
  if (!context) throw new Error("useBattle must be used within a BattleProvider");
  return context;
}