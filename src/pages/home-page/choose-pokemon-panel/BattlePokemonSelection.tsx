import type { Pokemon } from "@/hooks/usePokemonsData"; 

type BattlePokemonSelectionProps = {
  pokemons: Pokemon[];
  selectedId: string | null;
  onSelect: (pokemon: Pokemon) => void;
}

export const BattlePokemonSelection = ({
  pokemons,
  selectedId,
  onSelect,
} : BattlePokemonSelectionProps ) => {
  return (
    <div className="grid grid-cols-3 border-b border-gray-200 pb-4 gap-8 justify-items-center ">
      {pokemons.map(p => (
        <div
          key={p.id}
          onClick={() => onSelect(p)}
          className="rounded-full cursor-pointer transition bg-gray-100 w-[100px] h-[100px]"
        >
          <img
            src={p.image}
            alt={p.name}
            className={
              `rounded-full object-cover ring-2 transition ` +
              (selectedId === p.id
                ? "ring-blue-600"
                : "ring-transparent hover:ring-gray-300")
            }
          />
        </div>
      ))}
    </div>
  );
};