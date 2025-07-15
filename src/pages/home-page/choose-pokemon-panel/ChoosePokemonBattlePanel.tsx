import  { useState } from "react";
import { Dialog, DialogOverlay, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useLifePoints } from "@/hooks/useLifePoints";
import type { Pokemon } from "@/hooks/usePokemonsData"; 
import { BattlePokemonSelection } from "./BattlePokemonSelection";
import { BattlePanelFooter } from "./BattlePanelFooter";

type ChoosePokemonBattlePanelProps = {
  myPokemons: Pokemon[];
  allPokemons: Pokemon[];
  isOpen: boolean;
  onClose: () => void;
}

export const ChoosePokemonBattlePanel = ({
  myPokemons,
  isOpen,
  onClose,
}: ChoosePokemonBattlePanelProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { rematch } = useLifePoints()

  const handleSelect = (p: Pokemon) => setSelectedId(p.id);

  const handleStart = () => {
    rematch()
    onClose();
    navigate("/fighting-arena-page");
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogOverlay className="fixed inset-0 bg-opacity-50" />
      <DialogContent className="fixed top-1/2 left-1/2 w-[500px] max-w-[600px] h-[500px] max-h-[500px] overflow-y-auto bg-white pb-3">

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