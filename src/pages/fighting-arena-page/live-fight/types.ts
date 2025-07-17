
import type { Pokemon } from "@/hooks/usePokemonsData";
import { Status } from "../messages/FightMessage";

export type LiveFightScreenProps = {
  userPokemon: Pokemon; 
  opponentPokemon: Pokemon; 
};


export type FightMessageProps = {
  status: Status;
  attackerName: string;
  defenderName: string;
};