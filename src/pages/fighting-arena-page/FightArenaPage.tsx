import React from "react";
import { ChosenPokemonDisplay } from "./ChosenPokemonsDisplay";
import { useBattle } from "@/context/BattleContext";

export const FightArenaPage: React.FC = () => {
  const { userPokemon, opponentPokemon } = useBattle();

  if (!userPokemon || !opponentPokemon) {
    return;
  }

  return (
  <div className="space-y-6 text-center">
      <div className="px-4">
        <h2 className="text-heading-xl-medium text-gray-800">Fighting Arena</h2>
        <p className="mt-2 text-base text-gray-600">
          Start fighting against your opponent to win the battle
        </p>
      </div>

      <ChosenPokemonDisplay
        userPokemon={userPokemon}
        opponentPokemon={opponentPokemon}
        width="90%"
        height="600px"
      />
    </div>
  );
};