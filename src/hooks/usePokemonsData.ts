// src/hooks/usePokemonsData.ts
import { useState, useEffect } from "react";
import { getPokemons } from "@/api/getPokemons";

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
  const [totalItemsCount, setTotalItemsCount] = useState(0); 

  useEffect(() => {
    setPerPage(rowsPerPage);
    setPage(1); 
  }, [rowsPerPage]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('idToken');
        const params: any = {
          page: page,
          limit: perPage,
        };

        console.log("my pokemons ? ", showMyPokemons);

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


        const res = await getPokemons(params, token!);

        setAllPokemons(res.data.data);
        setTotalItemsCount(res.data.totalCount);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
        setAllPokemons([]);
        setTotalItemsCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [showMyPokemons, searchTerm, sortOption, page, perPage]);

  const pageCount = Math.ceil(totalItemsCount / perPage);

  return {
    pokemons: allPokemons,
    page,
    pageCount,
    perPage,
    setPage,
    setPerPage,
    loading,
    totalItemsCount,
  };
};