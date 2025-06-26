import React from "react";
import type { ChosenPokemonDisplayProps } from "./ChosenPokemonsDisplay";
import fightArena from "@/assets/fight-arena.png";


export const LiveFightScreen: React.FC<ChosenPokemonDisplayProps> = ({
  userPokemon,
  opponentPokemon,
}) => {
  return (
    <div
      className="
        relative
        mx-auto
        w-[90%] h-[400px]          
        md:w-[90%] md:h-[400px]  
        lg:w-[90%] lg:h-[650px]  
        bg-cover
        bg-center
      "
      style={{
        backgroundImage: `url(${fightArena})`,
      }}
    >
      {/* User Pokemon on bottom */}
      <img
        src={userPokemon.image}
        alt="YourPokemon"
        className="
          absolute
          left-[20%]   top-[60%]
          w-1/3        
          md:w-1/4       
          lg:w-[20%]  h-[30%]
          object-contain
          transform -translate-y-1/4
        "
      />

      {/* Opponent Pokemon on top */}
      <img
        src={opponentPokemon.image}
        alt="OpponentPokemon"
        className="
          absolute
          right-[25%]  top-[30%]
          w-1/3
          md:w-1/4
          lg:w-[20%] h-[30%]
          object-contain
          transform -translate-y-3/4
        "
      />
    </div>
  );
};
