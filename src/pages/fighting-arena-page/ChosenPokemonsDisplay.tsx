import React from "react";
import baseBg from "@/assets/chosen-pokemons.png";
import type { Pokemon } from "@/hooks/usePokemonsData";

interface ChosenPokemonDisplayProps {
  userPokemon: Pokemon;
  opponentPokemon: Pokemon;
  width?: number | string;
  height?: number | string;
}

export const ChosenPokemonDisplay: React.FC<ChosenPokemonDisplayProps> = ({
  userPokemon,
  opponentPokemon,
  width = "90%",
  height = "600px",
}) => {
  return (
    <div
      className="relative mx-auto"
      style={{
        width,
        height,
        backgroundImage: `url(${baseBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* User Pokemon on left */}
      <img
        src={userPokemon.image}
        alt="Your Pokémon"
        className="absolute left-14 top-1/4 transform -translate-y-1/4"
        style={{ width: "30%", objectFit: "contain" }}
      />

      {/* Opponent Pokmon on right */}
      <img
        src={opponentPokemon.image}
        alt="Opponent Pokémon"
        className="absolute right-14 top-3/4 transform -translate-y-3/4"
        style={{ width: "30%", objectFit: "contain" }}
      />
    </div>
  );
};
