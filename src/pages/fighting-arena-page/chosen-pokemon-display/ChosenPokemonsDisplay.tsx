import baseBg from "@/assets/chosen-pokemons.png";
import type { Pokemon } from "@/hooks/usePokemonsData";

export type ChosenPokemonDisplayProps = {
  userPokemon: Pokemon;
  opponentPokemon: Pokemon;
}

export const ChosenPokemonDisplay = ({
  userPokemon,
  opponentPokemon,
}:ChosenPokemonDisplayProps) => {
  return (
    <div
      className="
        relative
        my-6
        mx-auto
        w-[90%] h-[400px]          /* default: small screens */
        md:w-[90%] md:h-[400px]  
        lg:w-[90%] lg:h-[600px]  
        bg-cover
        bg-center
      "
      style={{
        backgroundImage: `url(${baseBg})`,
      }}
    >
      {/* User Pokemon on left */}
      <img
        src={userPokemon.image}
        alt="YourPokemon"
        className="
          absolute
          left-8   top-1/4
          w-1/3        
          md:w-1/4       
          lg:w-1/3       
          object-contain
          transform -translate-y-1/4
        "
      />

      {/* Opponent Pokemon on right */}
      <img
        src={opponentPokemon.image}
        alt="OpponentPokemon"
        className="
          absolute
          right-8  top-3/4
          w-1/3
          md:w-1/4
          lg:w-1/3
          object-contain
          transform -translate-y-3/4
        "
      />
    </div>
  );
};
