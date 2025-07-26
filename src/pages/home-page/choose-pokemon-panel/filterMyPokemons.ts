import type { Pokemon } from "@/hooks/usePokemonsData";

export function filterMyPokemons(myPokemons: Pokemon[]): Pokemon[] {
  if (typeof window === "undefined") return myPokemons;

  const currentPath = window.location.pathname;
  if (currentPath.includes("fighting-arena-page")) {
    const battleData = localStorage.getItem("battle");
    if (battleData) {
      try {
        const battle = JSON.parse(battleData);
        const userPokemonId = battle?.user?.id;
        return myPokemons.filter(p => p.id !== userPokemonId);
      } catch {
        // If parsing fails, just return the original list
        return myPokemons;
      }
    }
  }
  return myPokemons;
}