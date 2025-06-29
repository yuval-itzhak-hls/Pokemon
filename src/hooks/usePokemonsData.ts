// src/hooks/usePokemonsData.ts
import { useState, useEffect, useMemo } from "react";
import rawPokemons from "../data/pokemon.json";

interface RawPokemon {
  id: number;
  name: { english: string };
  description: string;
  species: string;
  profile: {
    height: string;
    weight: string;
    ability: string[][];
  };
  image: { hires?: string; sprite: string };
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
  };
}

export interface Pokemon {
  id: string;
  name: string;
  description: string;
  powerLevel: number; //attackPower
  hpLevel: number;
  image: string;
  isMyPokemon: boolean;
  height: string;
  weight: string;
  category: string;
  abilities: string[];
  defensePower: number;
  spAttack:number;
  spDefense: number;
  speed: number;
}

export type SortOption =
  | 'alpha-asc'
  | 'alpha-desc'
  | 'power-asc'
  | 'power-desc'
  | 'hp-asc'
  | 'hp-desc';

const STORAGE_KEY = 'myPokemons';

export function usePokemonsData(opts: {
  showMyPokemons: boolean;
  searchTerm: string;
  sortOption: SortOption;
  rowsPerPage: number;
}) {
  const { showMyPokemons, searchTerm, sortOption, rowsPerPage } = opts;
  const [myIds, setMyIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(rowsPerPage);

  // load/init, and reload 
  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setMyIds(JSON.parse(stored));
        } catch {
          localStorage.removeItem(STORAGE_KEY);
          setMyIds([]);
        }
      } else {
        // first-time seed: pick 5 random IDs
        const all = (rawPokemons as RawPokemon[]).map((p) =>
          p.id.toString().padStart(4, "0")
        );
        const pick = [...all].sort(() => Math.random() - 0.5).slice(0, 5);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pick));
        setMyIds(pick);
      }
    };

    load();
    window.addEventListener("focus", load);
    window.addEventListener("myPokemonsUpdated", load);
    return () => {
      window.removeEventListener("focus", load);
      window.removeEventListener("myPokemonsUpdated", load);
    };
  }, []);


  const baseList = useMemo<Pokemon[]>(() => {
    return (rawPokemons as RawPokemon[]).map(p => {
      const id = p.id.toString().padStart(4, '0');
      return {
        id,
        name: p.name.english,
        description: p.description,
        powerLevel: p.base?.Attack,
        hpLevel: p.base?.HP,
        image: p.image.hires ?? p.image.sprite,
        isMyPokemon: myIds.includes(id),
        height: p.profile?.height,
        weight: p.profile?.weight,
        category: p.species,
        abilities: p.profile?.ability.map((a) => a[0]),
        defensePower: p.base?.Defense,
        spAttack: p.base?.["Sp. Attack"],
        spDefense: p.base?.["Sp. Defense"],
        speed: p.base?.Speed,

      };
    });
  }, [myIds]);

  // filter
  let filtered = showMyPokemons
    ? baseList.filter(p => p.isMyPokemon)
    : baseList;

  if (searchTerm.trim()) {
    const t = searchTerm.trim().toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(t)
    );
  }

  // sort
  const sorted = useMemo(() => {
    const out = [...filtered];
    switch (sortOption) {
      case 'alpha-desc':
        return out.sort((a, b) => b.name.localeCompare(a.name));
      case 'power-asc':
        return out.sort((a, b) => a.powerLevel - b.powerLevel);
      case 'power-desc':
        return out.sort((a, b) => b.powerLevel - a.powerLevel);
      case 'hp-asc':
        return out.sort((a, b) => a.hpLevel - b.hpLevel);
      case 'hp-desc':
        return out.sort((a, b) => b.hpLevel - a.hpLevel);
      case 'alpha-asc':
      default:
        return out.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filtered, sortOption]);

  // pagination
  const pageCount = Math.ceil(sorted.length / perPage);
  const slice = useMemo(() => {
    const start = (page - 1) * perPage;
    return sorted.slice(start, start + perPage);
  }, [sorted, page, perPage]);

  return {
    pokemons: slice,
    page,
    pageCount,
    perPage,
    setPage,
    setPerPage,
  };
}
