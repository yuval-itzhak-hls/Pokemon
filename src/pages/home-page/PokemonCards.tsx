// src/components/PokemonCards.tsx
import React, { useState, useRef } from "react";
import { usePokemonsData } from "@/hooks/usePokemonsData";
import type { SortOption, Pokemon } from "@/hooks/usePokemonsData";
import rawPokemons from "../../data/pokemon.json";
import { PokemonDetailsPanel } from "./PokemonDetailsPanel";
import type { PokemonDetails } from "./PokemonDetailsPanel";

interface PokemonCardsProps {
  showMyPokemons: boolean;
  searchTerm: string;
  sortOption: SortOption;
}

export const PokemonCards: React.FC<PokemonCardsProps> = ({
  showMyPokemons,
  searchTerm,
  sortOption,
}) => {
  const totalRaw = rawPokemons.length;
  const { pokemons } = usePokemonsData({ showMyPokemons, searchTerm, sortOption, rowsPerPage: totalRaw });

  // infinite scroll state
  const BATCH = 20;
  const [visibleCount, setVisibleCount] = React.useState<number>(BATCH);
  const [selected, setSelected] = useState<PokemonDetails | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollTop, clientHeight, scrollHeight } = el;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setVisibleCount(prev => Math.min(prev + BATCH, pokemons.length));
    }
  };

  const closePanel = () => setSelected(null);

  return (
    <>
      <div
        ref={containerRef}
        onScroll={onScroll}
        className="max-w-[1360px] mx-auto overflow-y-auto"
        style={{ maxHeight: '80vh' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemons.slice(0, visibleCount).map((p: Pokemon) => (
            <div
              key={p.id}
              className="bg-white p-4 flex flex-col text-left h-[308px] w-[322px] cursor-pointer"
              onClick={() =>
                  setSelected({
                    id: p.id,
                    name: p.name,
                    image: p.image,
                    description: p.description,
                    height: p.height,
                    weight: p.weight,
                    category: p.category,
                    abilities: p.abilities,
                  })}
            >
              <div className="relative bg-gray-50 overflow-hidden mb-4 items-center w-full h-[195px]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-[200px] object-contain items-center"
                />
              </div>
              <span className="text-subheading-regular text-neutrals-200 mb-1">#{p.id}</span>
              <h3 className="text-heading-lg-regular mb-2 truncate">{p.name}</h3>
              <p className="text-sm text-gray-600">{`${p.hpLevel} HP`}</p>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <PokemonDetailsPanel
          pokemon={selected}
          isOpen={!!selected}
          onClose={closePanel}
        />
      )}
    </>
  );
};
