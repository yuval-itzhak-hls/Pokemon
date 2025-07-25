import  { useState } from "react";
import { Dialog, DialogOverlay, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Pokemon } from "@/hooks/usePokemonsData"; 
import { BattlePokemonSelection } from "./BattlePokemonSelection";
import { BattlePanelFooter } from "./BattlePanelFooter";
import { useLifePoints } from "@/hooks/useLifePoints"; 


type ChoosePokemonBattlePanelProps = {
  myPokemons: Pokemon[];
  allPokemons: Pokemon[];
  isOpen: boolean;
  onClose: () => void;
}

export const ChoosePokemonBattlePanel = (props: ChoosePokemonBattlePanelProps) => {
  const { myPokemons, isOpen, onClose } = props;

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

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && handleOnClose()}>
      <DialogOverlay className="fixed inset-0 bg-opacity-50" />
      <DialogContent className="fixed top-1/2 left-1/2 w-[500px] max-w-[600px] h-[500px] max-h-[500px] bg-white pb-3">

        <div className="flex justify-between items-center mb-1">
          <DialogTitle className="text-heading-lg-regular">Choose the Pokemon to battle with</DialogTitle>
        </div>

        <BattlePokemonSelection
          pokemons={myPokemons}
          selectedId={selectedId}
          onSelect={handleSelect}
        />

        <BattlePanelFooter
          isDisabled={!selectedId}
          onStart={handleStart}
        />
      </DialogContent>
    </Dialog>
  );
};