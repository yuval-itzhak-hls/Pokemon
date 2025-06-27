import React, { useState, useEffect } from "react";
import type { ChosenPokemonDisplayProps } from "./ChosenPokemonsDisplay";
import fightArena from "@/assets/fight-arena.png";
import { AttackButton } from "./AttackButton";
import { LifeBarCard } from "./LifeBarCard";
import { useLifePoints } from "@/hooks/useLifePoints";

export const LiveFightScreen: React.FC<ChosenPokemonDisplayProps> = ({
  userPokemon,
  opponentPokemon,
}) => {
  const { userLife, opponentLife, applyAttack } = useLifePoints();
  const [isUserTurn, setIsUserTurn] = useState(
    userPokemon.speed > opponentPokemon.speed
  );

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

  if (!userPokemon || !opponentPokemon) return null;

  return (
    <div
      className="
        relative
        mx-auto
        w-[90%] h-[400px]
        md:w-[90%] md:h-[400px]
        lg:w-[90%] lg:h-[650px]
        bg-cover bg-center
      "
      style={{ backgroundImage: `url(${fightArena})` }}
    >
      {/* Opponent life bar at the top-right corner */}
      <LifeBarCard
        name={opponentPokemon.name}
        speed={opponentPokemon.speed}
        life={opponentLife}
        max={opponentPokemon.hpLevel}
        isActive={!isUserTurn}
        className="
          absolute
          top-2 md:top-4     
          right-2 md:right-4
        "
      />

      {/* User life bar at the bottom-left corner */}
      <LifeBarCard
        name={userPokemon.name}
        speed={userPokemon.speed}
        life={userLife}
        max={userPokemon.hpLevel}
        isActive={isUserTurn}
        className="
          absolute
          bottom-2 md:bottom-4
          left-2 md:left-4
        "
      />

      <img
        src={userPokemon.image}
        alt="YourPokemon"
        className="
          absolute left-[20%] top-[60%]
          w-1/3 md:w-1/4 lg:w-[20%] h-[30%]
          object-contain transform -translate-y-1/4
        "
      />

      <img
        src={opponentPokemon.image}
        alt="OpponentPokemon"
        className="
          absolute right-[25%] top-[30%]
          w-1/3 md:w-1/4 lg:w-[20%] h-[30%]
          object-contain transform -translate-y-3/4
        "
      />

      <div
        className={`
          absolute bottom-4 right-1/4
          ${!isUserTurn ? "pointer-events-none opacity-50" : ""}
        `}
      >
        <AttackButton onClick={handleAttack} hover={isUserTurn} visible />
      </div>
    </div>
  );
};
