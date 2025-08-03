import { useState } from "react";
import { Dialog, DialogOverlay, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { usePokemonsData } from "@/hooks/usePokemonsData";
import type { Pokemon } from "@/hooks/usePokemonsData"; 
import { BattlePokemonSelection } from "./BattlePokemonSelection";
import { BattlePanelFooter } from "./BattlePanelFooter";
import { useLifePoints } from "@/hooks/useLifePoints"; 


type ChoosePokemonBattlePanelProps = {
  userPokemon?: Pokemon; 
  isOpen: boolean;
  onClose: () => void;
};

export const ChoosePokemonBattlePanel = (props: ChoosePokemonBattlePanelProps) => {
  const { userPokemon, isOpen, onClose } = props;

  // Always get the latest list of my pokemons
  const { pokemons: myPokemons, loading } = usePokemonsData({
    showMyPokemons: true,
    searchTerm: "",
    sortOption: "alpha-asc",
    rowsPerPage: 1000,
  });


  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { startNewBattle } = useLifePoints();

  const handleSelect = (p: Pokemon) => setSelectedId(p.id);

  const handleOnClose = () => {
    onClose();
    setSelectedId(null); 
   }

  const handleStart = () => {
    if (selectedId) {
      startNewBattle(selectedId, handleOnClose);
      setSelectedId(null); 
    }
  };

  const disabledId = userPokemon?.id;

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && handleOnClose()}>
      <DialogOverlay className="fixed inset-0 bg-opacity-50" />
      <DialogContent className="fixed top-1/2 left-1/2 w-[500px] max-w-[550px] h-[420px] max-h-[500px] bg-white pb-3">

        <div className="flex justify-between items-center mb-1">
          <DialogTitle className="text-heading-lg-regular">Choose the Pokemon to battle with</DialogTitle>
        </div>

        <BattlePokemonSelection
          pokemons={myPokemons}
          selectedId={selectedId}
          onSelect={handleSelect}
          loading={loading}
          disabledId={disabledId} // <-- pass the disabled ids
        />

        <BattlePanelFooter
          isDisabled={!selectedId}
          onStart={handleStart}
        />
      </DialogContent>
    </Dialog>
  );
};