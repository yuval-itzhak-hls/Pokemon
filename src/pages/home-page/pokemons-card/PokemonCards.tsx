import { useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Pokemon } from "@/hooks/usePokemonsData";
import { PokemonDetailsPanel } from "../pokemon-details-panel/PokemonDetailsPanel";
import type { PokemonDetails } from "../pokemon-details-panel/PokemonDetailsPanel";

type PokemonCardsProps = {
  pokemons: Pokemon[];
  loading: boolean;
};

export const PokemonCards = ({
  pokemons,
  loading,
}: PokemonCardsProps) => {

  const BATCH = 20;
  const [visibleCount, setVisibleCount] = useState<number>(BATCH);
  const [selected, setSelected] = useState<PokemonDetails | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track loaded images by id (string)
  const [imgLoadedMap, setImgLoadedMap] = useState<Record<string, boolean>>({});

  const onScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollTop, clientHeight, scrollHeight } = el;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setVisibleCount(prev => Math.min(prev + BATCH, pokemons.length));
    }
  };

  const closePanel = () => setSelected(null);

  const handleImgLoad = (id: string) => {
    setImgLoadedMap(prev => ({ ...prev, [id]: true }));
  };

  // Card rendering with image skeleton
  const renderCard = (p: Pokemon) => (
    <div
      key={p.id}
      className="bg-white p-4 flex flex-col text-left h-[308px] w-[322px] rounded-md cursor-pointer lg:w-auto"
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
        })
      }
    >
      <div className="relative bg-gray-50 overflow-hidden mb-4 items-center w-full h-[195px] flex justify-center">
        {!imgLoadedMap[p.id] && (
          <Skeleton className="absolute h-[200px] w-full rounded-md" />
        )}
        <img
          src={p.image}
          alt={p.name}
          className={`w-full h-[200px] object-contain items-center transition-opacity duration-300 ${imgLoadedMap[p.id] ? "opacity-100" : "opacity-0"}`}
          onLoad={() => handleImgLoad(p.id)}
        />
      </div>
      <span className="text-subheading-regular text-neutrals-200 mb-1">#{p.id}</span>
      <h3 className="text-heading-lg-regular mb-2 truncate">{p.name}</h3>
      <p className="text-sm text-gray-600">{`${p.hpLevel} HP`}</p>
    </div>
  );

  return (
    <>
      {loading ? (
        <div
          ref={containerRef}
          className="flex justify-center w-auto mx-auto"
          style={{ maxHeight: '80vh' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 w-full">
            {Array.from({ length: BATCH }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 flex flex-col text-left h-[308px] w-[322px] rounded-md lg:w-auto"
              >
                <div className="relative bg-gray-50 overflow-hidden mb-4 items-center w-full h-[195px] flex justify-center">
                  <Skeleton className="h-[200px] w-full rounded-md" />
                </div>
                <Skeleton className="h-6 w-20 mb-2" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          onScroll={onScroll}
          className="flex justify-center w-auto mx-auto overflow-y-auto"
          style={{ maxHeight: '80vh' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 w-full">
            {pokemons.slice(0, visibleCount).map((p: Pokemon) => renderCard(p))}
          </div>
        </div>
      )}

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
