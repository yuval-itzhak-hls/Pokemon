// src/hooks/usePokemonsData.ts
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(rowsPerPage);

  // Build params for API
  const params: any = {
    page,
    limit: perPage,
  };
  if (showMyPokemons) params.mine = 'true';
  if (searchTerm) params.search = searchTerm;
  if (sortOption.includes('alpha')) params.sortBy = 'name';
  else if (sortOption.includes('power')) params.sortBy = 'powerLevel';
  else if (sortOption.includes('hp')) params.sortBy = 'hpLevel';
  if (sortOption.endsWith('asc')) params.order = 'asc';
  else if (sortOption.endsWith('desc')) params.order = 'desc';

  const token = typeof window !== "undefined" ? localStorage.getItem('idToken') : undefined;

  const queryKey = [
    "pokemons",
    showMyPokemons,
    searchTerm,
    sortOption,
    page,
    perPage,
  ];

  // For refetching on MY_POKEMONS_UPDATED_EVENT
  const { 
    data, 
    isLoading: loading, 
    error, 
    refetch 
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await getPokemons(params, token!);
      return {
        pokemons: res.data.data,
        totalItemsCount: res.data.totalCount,
      };
    },
    placeholderData: (previous) => previous,
  });

  useEffect(() => {
    const handler = () => {
      refetch();
    };
    window.addEventListener("MY_POKEMONS_UPDATED_EVENT", handler);
    return () => {
      window.removeEventListener("MY_POKEMONS_UPDATED_EVENT", handler);
    };
  }, [refetch]);

  const pokemons = data?.pokemons ?? [];
  const totalItemsCount = data?.totalItemsCount ?? 0;
  const pageCount = Math.ceil(totalItemsCount / perPage);

  return {
    pokemons,
    page,
    pageCount,
    perPage,
    setPage,
    setPerPage,
    loading,
    error,
    totalItemsCount,
  };
};