import { useState, useEffect, useCallback } from "react";
import { useBattle } from "@/context/BattleContext";
import { usePokemonsData, type Pokemon } from "@/hooks/usePokemonsData";
import { useNavigate } from "react-router-dom";


const DAMAGE_MULTIPLIER_MIN = 0.7;
const DAMAGE_MULTIPLIER_MAX = 1.2;

export const useLifePoints = () => {
  const { userPokemon, opponentPokemon, setBattle } = useBattle();
  const navigate = useNavigate();

  // grab the full roster to pick a new random opponent later
  const { pokemons: allPokemons } = usePokemonsData({
    showMyPokemons: false,
    searchTerm: "",
    sortOption: "alpha-asc",
    rowsPerPage: 999,
  });

    const { pokemons: myPokemons } = usePokemonsData({
    showMyPokemons: true,
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
    setUserLife(userPokemon?.hpLevel ?? 0);
  }, [userPokemon]);
  
  useEffect(() => {
    setOpponentLife(opponentPokemon?.hpLevel ?? 0);
  }, [opponentPokemon]); 


  const applyAttack = useCallback(
    (isUserTurn: boolean) => {
      if (!userPokemon || !opponentPokemon) return;

      const attacker: Pokemon = isUserTurn ? userPokemon : opponentPokemon;
      const defender: Pokemon = isUserTurn ? opponentPokemon : userPokemon;
      const setDefenderLife = isUserTurn ? setOpponentLife : setUserLife;

      const randomMultiplier =
        Math.random() * (DAMAGE_MULTIPLIER_MAX - DAMAGE_MULTIPLIER_MIN) +
        DAMAGE_MULTIPLIER_MIN;


      const randomAttack = Math.round(attacker.powerLevel * randomMultiplier);  

      const baseDamage = Math.abs(randomAttack - defender.defensePower);
      
      const finalDamage = Math.round(baseDamage * randomMultiplier);

      setDefenderLife((prevLife) => Math.max(prevLife - finalDamage, 0));
    },
    [userPokemon, opponentPokemon]
  );


  
  const rematch = useCallback(() => {
    if (!userPokemon) return;

    const potentialOpponents = allPokemons.filter(
      (pokemon: Pokemon) => pokemon.id !== userPokemon.id
    );
    const newOpponent =
      potentialOpponents[Math.floor(Math.random() * potentialOpponents.length)];

    setBattle(userPokemon, newOpponent);
    setOpponentLife(newOpponent.hpLevel);
    
  }, [allPokemons, setBattle, userPokemon]);



 const startNewBattle = useCallback(
    (selectedUserPokemonId: string, onPanelClose: () => void): void => {
      if (!selectedUserPokemonId) return;

      const user = myPokemons.find((p : Pokemon) => p.id === selectedUserPokemonId);
      if (!user) {
        return;
      }

      const availableOpponents = allPokemons.filter(
        (p : Pokemon) => p.id !== selectedUserPokemonId && !myPokemons.some((mp : Pokemon) => mp.id === p.id)
      );

      const opponent =
        availableOpponents[Math.floor(Math.random() * availableOpponents.length)];

      setBattle(user, opponent);
      onPanelClose();
      navigate("/fighting-arena-page"); 
    },
    [myPokemons, allPokemons, setBattle, navigate] 
  );


  return {
    userLife,
    opponentLife,
    startNewBattle,
    applyAttack,
    rematch,
  };
}
