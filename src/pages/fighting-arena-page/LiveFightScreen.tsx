import React, { useState, useEffect } from "react";
import type { ChosenPokemonDisplayProps } from "./ChosenPokemonsDisplay";
import fightArena from "@/assets/fight-arena.png";
import { AttackButton } from "./AttackButton";
import { LifeBarCard } from "./LifeBarCard";
import { useLifePoints } from "@/hooks/useLifePoints";
import { LostPanel } from "./LostPanel";
import { usePokemonsData, type Pokemon } from "@/hooks/usePokemonsData";
import { ChoosePokemonBattlePanel } from "../home-page/ChoosePokemonBattlePanel";
import { useNavigate } from "react-router-dom";

export const LiveFightScreen: React.FC<ChosenPokemonDisplayProps> = ({
  userPokemon,
  opponentPokemon,
}) => {
  let navigate = useNavigate();
  const { userLife, opponentLife, applyAttack } = useLifePoints();
  const [isUserTurn, setIsUserTurn] = useState(
    userPokemon.speed > opponentPokemon.speed
  );
  const [showChoose, setShowChoose] = useState(false);
  const [showLost, setShowLost] = useState(false);

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

  const handleAttack = () => {
    applyAttack(isUserTurn);
    setIsUserTurn((t) => !t);
  };

  useEffect(() => {
    if (!isUserTurn) {
      const timer = setTimeout(handleAttack, 3000);
      return () => clearTimeout(timer);
    }
  }, [isUserTurn]);

  useEffect(() => {
    if (userLife <= 0) {
      setShowLost(true);
    }
  }, [userLife]);

  const onEndMatch = () => {
    navigate("/home-page");
  };

  const onSwitchPokemon = () => {
    setShowChoose(true);
    setShowLost(false);
  };

  if (showChoose) {
    return (
      <ChoosePokemonBattlePanel
        myPokemons={myPokemons as Pokemon[]}
        allPokemons={allPokemons as Pokemon[]}
        isOpen={true}
        onClose={() => setShowChoose(false)}
      />
    );
  }

  if (!userPokemon || !opponentPokemon) return null;

  return (
    <div
      className="relative mx-auto w-[90%] h-[400px] md:w-[90%] md:h-[400px] lg:w-[90%] lg:h-[650px] bg-cover bg-center"
      style={{ backgroundImage: `url(${fightArena})` }}
    >
      {/* Opponent life bar */}
      <LifeBarCard
        name={opponentPokemon.name}
        speed={opponentPokemon.speed}
        life={opponentLife}
        max={opponentPokemon.hpLevel}
        isActive={!isUserTurn}
        className="absolute top-4 right-4"
      />

      {/* User life bar */}
      <LifeBarCard
        name={userPokemon.name}
        speed={userPokemon.speed}
        life={userLife}
        max={userPokemon.hpLevel}
        isActive={isUserTurn}
        className="absolute bottom-4 left-4"
      />

      {/* Sprites & button */}
      <img
        src={userPokemon.image}
        alt="YourPokemon"
        className="absolute left-[20%] top-[60%] w-1/3 md:w-1/4 lg:w-[20%] h-[30%] object-contain transform -translate-y-1/4"
      />
      <img
        src={opponentPokemon.image}
        alt="OpponentPokemon"
        className="absolute right-[25%] top-[30%] w-1/3 md:w-1/4 lg:w-[20%] h-[30%] object-contain transform -translate-y-3/4"
      />
      <div className={`absolute bottom-4 right-1/4 ${!isUserTurn ? "pointer-events-none opacity-50" : ""}`}>
        <AttackButton onClick={handleAttack} hover={isUserTurn} visible />
      </div>

      <LostPanel
        open={showLost}
        onOpenChange={setShowLost}
        name={userLife === 0 ? userPokemon.name : opponentPokemon.name}
        sprite={userLife === 0 ? userPokemon.image : opponentPokemon.image}
        onSwitch={onSwitchPokemon}
        onEnd={onEndMatch}
      />
    </div>
  );
};
