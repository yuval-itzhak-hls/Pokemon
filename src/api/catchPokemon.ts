// src/api/catchPokemon.ts
import axios from "axios";

export const catchPokemon = async (pokemonId: string, token: string) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/pokemons/${pokemonId}/catch`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
