import type { Pokemon } from "@/hooks/usePokemonsData"; 
import { Skeleton } from "@/components/ui/skeleton";

type BattlePokemonSelectionProps = {
  pokemons: Pokemon[];
  selectedId: string | null;
  onSelect: (pokemon: Pokemon) => void;
  loading?: boolean;
}

export const BattlePokemonSelection = ({
  pokemons,
  selectedId,
  onSelect,
  loading = false,
} : BattlePokemonSelectionProps ) => {
  if (loading) {
    // Show 6 skeletons as placeholders
    return (
      <div className="grid grid-cols-3 border-b border-gray-200 py-4 gap-8 justify-items-center overflow-y-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-full bg-gray-100 w-[100px] h-[100px] flex items-center justify-center">
            <Skeleton className="w-[80px] h-[80px] rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 border-b border-gray-200 py-4 gap-8 justify-items-center overflow-y-auto">
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