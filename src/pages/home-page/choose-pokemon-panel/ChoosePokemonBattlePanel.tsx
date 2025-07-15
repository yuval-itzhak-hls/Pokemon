import  { useState } from "react";
import { Dialog, DialogOverlay, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useBattle } from "@/context/BattleContext";
import type { Pokemon } from "@/hooks/usePokemonsData"; 
import { BattlePokemonSelection } from "./BattlePokemonSelection";
import { BattlePanelFooter } from "./BattlePanelFooter";

interface ChoosePokemonBattlePanelProps {
  myPokemons: Pokemon[];
  allPokemons: Pokemon[];
  isOpen: boolean;
  onClose: () => void;
}

export const ChoosePokemonBattlePanel = ({
  myPokemons,
  allPokemons,
  isOpen,
  onClose,
}: ChoosePokemonBattlePanelProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setBattle } = useBattle();

  const handleSelect = (p: Pokemon) => setSelectedId(p.id);

  const handleStart = () => {
    if (!selectedId) return; 

    const user = myPokemons.find(p => p.id === selectedId)!; 
    const optionalOpponents = allPokemons.filter(
      p => p.id !== selectedId && !myPokemons.some(mp => mp.id === p.id)
    );
    
    const opponent = optionalOpponents[Math.floor(Math.random() * optionalOpponents.length)];

    setBattle(user, opponent);
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