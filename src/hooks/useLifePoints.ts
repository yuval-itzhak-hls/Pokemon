import { useState, useEffect, useCallback } from "react";
import { useBattle } from "@/context/BattleContext";
import type { Pokemon } from "@/hooks/usePokemonsData";

export function useLifePoints() {
  const { userPokemon, opponentPokemon } = useBattle();

  const [userLife, setUserLife] = useState<number>(
    userPokemon?.hpLevel ?? 0
  );
  const [opponentLife, setOpponentLife] = useState<number>(
    opponentPokemon?.hpLevel ?? 0
  );

  //reset if we switch to a new battle
  useEffect(() => {
    if (userPokemon) setUserLife(userPokemon.hpLevel);
  }, [userPokemon]);

  useEffect(() => {
    if (opponentPokemon) setOpponentLife(opponentPokemon.hpLevel);
  }, [opponentPokemon]);

  const applyAttack = useCallback(
    (isUserTurn: boolean) => {
      if (!userPokemon || !opponentPokemon) return;

      //checking how is attacker/defender based on turn
      const attacker: Pokemon = isUserTurn ? userPokemon : opponentPokemon;
      const defender: Pokemon = isUserTurn ? opponentPokemon : userPokemon;
      const setDefenderLife = isUserTurn ? setOpponentLife : setUserLife;

      const damage = Math.abs(attacker.powerLevel - defender.defensePower);
      setDefenderLife((prev) => Math.max(prev - damage, 0));
    },
    [userPokemon, opponentPokemon]
  );

  return { userLife, opponentLife, applyAttack };
}
