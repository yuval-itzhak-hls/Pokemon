import { createContext, useContext, useState, useEffect, type ReactNode} from "react";
import type { Pokemon } from "@/hooks/usePokemonsData";

type BattleContextValue = {
  userPokemon: Pokemon | null;
  opponentPokemon: Pokemon | null;
  setBattle: (user: Pokemon, opponent: Pokemon) => void;
  clearBattle: () => void;
}

const BattleContext = createContext<BattleContextValue | undefined>(undefined);
const STORAGE_KEY = "battle";


export const BattleProvider = ({ children }: { children: ReactNode }) => {
  const [userPokemon, setUserPokemon] = useState<Pokemon | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { user, opponent } = JSON.parse(stored) as { user: Pokemon; opponent: Pokemon };
        setUserPokemon(user);
        setOpponentPokemon(opponent);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const setBattle = (user: Pokemon, opponent: Pokemon) => {
    setUserPokemon(user);
    setOpponentPokemon(opponent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, opponent }));
  };

  const clearBattle = () => {
    setUserPokemon(null);
    setOpponentPokemon(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <BattleContext.Provider value={{ userPokemon, opponentPokemon, setBattle, clearBattle}}>
      {children}
    </BattleContext.Provider>
  );
};

export const useBattle = (): BattleContextValue => {
  const context = useContext(BattleContext);
  if (!context) throw new Error("useBattle must be used within a BattleProvider");
  return context;
}