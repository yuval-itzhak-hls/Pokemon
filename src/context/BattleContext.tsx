import { createContext, useContext, useState, type ReactNode} from "react";
import type { Pokemon } from "@/hooks/usePokemonsData";

type BattleContextValue = {
  userPokemon: Pokemon | null;
  opponentPokemon: Pokemon | null;
  setBattle: (user?: Pokemon, opponent?: Pokemon) => void;
  clearBattle: () => void;
}

const BattleContext = createContext<BattleContextValue | undefined>(undefined);

export const BattleProvider = ({ children }: { children: ReactNode }) => {
  const [userPokemon, setUserPokemon] = useState<Pokemon | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);

  const setBattle = (user?: Pokemon, opponent?: Pokemon) => {
    if (user){
      setUserPokemon(user);
    }
    if (opponent){
      setOpponentPokemon(opponent);
    }
  };

  const clearBattle = () => {
    setUserPokemon(null);
    setOpponentPokemon(null);
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