import React from "react"; 
import { PokemonsList } from "./PokemonsList";   
import { useOutletContext } from "react-router-dom";
  


export const HomePage: React.FC = () => {

  const { showMyPokemons } = useOutletContext<{ showMyPokemons: boolean }>();

  return (
      <div className="space-y-6">
      <PokemonsList
        rowsPerPage={10}
        showMyPokemons={showMyPokemons}
      />
    </div>
  );
};
