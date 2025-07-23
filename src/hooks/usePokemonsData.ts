// src/hooks/usePokemonsData.ts
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export type Pokemon = {
  id: string;
  name: string;
  description: string;
  powerLevel: number;
  hpLevel: number;
  image: string;
  isMyPokemon: boolean;
  height: string;
  weight: string;
  category: string;
  abilities: string[];
  defensePower: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  type: string[];
};

export type SortOption =
  | 'alpha-asc'
  | 'alpha-desc'
  | 'power-asc'
  | 'power-desc'
  | 'hp-asc'
  | 'hp-desc';

export const usePokemonsData = (opts: {
  showMyPokemons: boolean;
  searchTerm: string;
  sortOption: SortOption;
  rowsPerPage: number;
}) => {
  const { showMyPokemons, searchTerm, sortOption, rowsPerPage } = opts;
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(rowsPerPage);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('accessToken'); 
        const params: any = {};

        console.log("my pokemons ? ",showMyPokemons);

        if (showMyPokemons) params.mine = 'true';
        if (searchTerm) params.search = searchTerm;
        
        if (sortOption.includes('alpha')) {
          params.sortBy = 'name';
        } else if (sortOption.includes('power')) {
          params.sortBy = 'powerLevel';
        } else if (sortOption.includes('hp')) {
          params.sortBy = 'hpLevel';
        }

        if (sortOption.endsWith('asc')) {
          params.order = 'asc';
        } else if (sortOption.endsWith('desc')) {
          params.order = 'desc';
        }

        const res = await axios.get('http://localhost:3000/pokemons', {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAllPokemons(res.data);
        setPage(1); // reset page if data changes
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [showMyPokemons, searchTerm, sortOption]);

  
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return allPokemons.slice(start, start + perPage);
  }, [allPokemons, page, perPage]);

  const pageCount = Math.ceil(allPokemons.length / perPage);

  return {
    pokemons: paginated,
    page,
    pageCount,
    perPage,
    setPage,
    setPerPage,
    loading,
  };
};
