


export const LOCAL_STORAGE_MY_POKEMONS_KEY = "myPokemons";


export const MY_POKEMONS_UPDATED_EVENT = "myPokemonsUpdated";

export const BattleConfig = {
  OpponentAttackDelayMs: 3000,
  ResultPanelDelayMs: 1200,
  CatchTriesLimit: 3,
  LowHpCatchRate: 0.4,
  HighHpCatchRate: 0.2,
} as const;


export const DefaultValues = {
  InitialLife: 0,
  InitialCatchTries: 0,
  DefaultId: undefined,
  InitialCaught: false,
  InitialIsAbleCatch: false,
  InitialIsSwitch: false,
  InitialUserAttacked: false,
  InitialOpponentAttacked: false,
} as const;


export const SwitchPokemonDropdownPlaceholder = "Switch Pokemon";


export type BattleResult = "won" | "lost";