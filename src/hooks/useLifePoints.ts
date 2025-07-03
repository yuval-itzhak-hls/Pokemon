import { useState, useEffect, useCallback } from "react";
import { useBattle } from "@/context/BattleContext";
import { usePokemonsData, type Pokemon } from "@/hooks/usePokemonsData";

export function useLifePoints() {
  const { userPokemon, opponentPokemon, setBattle } = useBattle();

  // grab the full roster to pick a new random opponent later
  const { pokemons: allPokemons } = usePokemonsData({
    showMyPokemons: false,
    searchTerm: "",
    sortOption: "alpha-asc",
    rowsPerPage: 999,
  });

  const [userLife, setUserLife] = useState<number>(
    userPokemon?.hpLevel ?? 0
  );
  const [opponentLife, setOpponentLife] = useState<number>(
    opponentPokemon?.hpLevel ?? 0
  );

  // whenever userPokemon/opponentPokemon change, reset their life bars
  useEffect(() => {
    if (userPokemon) {
      setUserLife(userPokemon.hpLevel);
    }
  }, [userPokemon]);

  useEffect(() => {
    if (opponentPokemon) {
      setOpponentLife(opponentPokemon.hpLevel);
    }
  }, [opponentPokemon]);

  const applyAttack = useCallback(
    (isUserTurn: boolean) => {
      if (!userPokemon || !opponentPokemon) return;

      const attacker: Pokemon = isUserTurn ? userPokemon : opponentPokemon;
      const defender: Pokemon = isUserTurn ? opponentPokemon : userPokemon;
      const setDefenderLife = isUserTurn ? setOpponentLife : setUserLife;

      const damage = Math.abs(attacker.powerLevel - defender.defensePower);
      const randomDamage = Math.round(damage * (Math.random() * (0.7 - 0.2) + 0.2));
      setDefenderLife((prev) => Math.max(prev - randomDamage, 0));
    },
    [userPokemon, opponentPokemon]
  );

  const rematch = useCallback(() => {
    if (!userPokemon) return;

    const candidates = allPokemons.filter(
      (p) => p.id !== userPokemon.id
    );
    const newOpponent =
      candidates[Math.floor(Math.random() * candidates.length)];

    setBattle(userPokemon, newOpponent);

    // reset life bars to full HP
    setUserLife(userPokemon.hpLevel);
    setOpponentLife(newOpponent.hpLevel);
  }, [allPokemons, setBattle, userPokemon]);

  return {
    userLife,
    opponentLife,
    applyAttack,
    rematch,
  };
}
