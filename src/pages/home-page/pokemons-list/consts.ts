export const PokemonTableHeaders = {
  Name: "Pokemon name",
  Id: "ID",
  Description: "Description",
  PowerLevel: "Power level",
  HpLevel: "HP level",
} as const;


export const NoPokemonsFound = {
  Message: "No Pokemons were found",
  IconAltText: "No results icon",
} as const;


export const PaginationTexts = {
  RowsPerPage: "Rows per page:",
  PreviousPage: "Previous page",
  NextPage: "Next page",
  NoItemsFound: "0-0 of 0 items",
  ItemsLabel: "items",
} as const;


export const ItemsPerPageOptions = [10, 20, 30, 50] as const;