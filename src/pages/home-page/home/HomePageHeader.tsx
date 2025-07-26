
import { SearchBar } from "@/design-system/generic-componenets/search/SearchBar";
import { GenericDropDown } from "@/design-system/generic-componenets/drop-down/GenericDropDown";
import { GenericTab } from "@/design-system/generic-componenets/tab/GenericTab";
import type { SortOption } from "@/hooks/usePokemonsData";
import {
  HeaderTabsConfig,
  PokemonSortOptions,
  SearchBarPlaceholder,
} from "./consts"; 
import type { ActiveTabType } from "./types";


type HomePageHeaderProps = {
  modeTitle: string;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  activeTab: ActiveTabType;
  onActiveTabChange: (tab: ActiveTabType) => void;
  sortOption: SortOption;
  onSortOptionChange: (option: SortOption) => void;
};


export const HomePageHeader = (props: HomePageHeaderProps) => {
  const {
    modeTitle,
    searchTerm,
    onSearchTermChange,
    activeTab,
    onActiveTabChange,
    sortOption,
    onSortOptionChange,
  } = props;

  return (
    <>
      <div className="px-4">
        <h2 className="text-heading-xl-medium text-gray-800">{modeTitle}</h2>
      </div>

      <div className="px-4 py-1 flex items-center gap-4 ">
        <div className="w-[294px]">
          <SearchBar
            value={searchTerm}
            onChange={onSearchTermChange}
            placeholder={SearchBarPlaceholder}
            className="w-full rounded-lg"
          />
        </div>

        <GenericTab
          variant="secondaryTab"
          tabs={HeaderTabsConfig}
          value={activeTab}
          onValueChange={(value) => onActiveTabChange(value as ActiveTabType)}
        />

        <div className="ml-auto">
          <GenericDropDown
            placeholder=""
            options={PokemonSortOptions}
            value={sortOption}
            onValueChange={(value) => onSortOptionChange(value as SortOption)}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
};