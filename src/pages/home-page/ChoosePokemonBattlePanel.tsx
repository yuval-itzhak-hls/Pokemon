import React, { useState } from "react";
import { Dialog, DialogOverlay, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import type { Pokemon } from "@/hooks/usePokemonsData";
import { GenericButton } from "@/design-system/generic-componenets/GenericButton";
import { useNavigate } from "react-router-dom";


interface ChoosePokemonBattlePanelProps {
  pokemons: Pokemon[];   //only my pokemons
  isOpen: boolean;
  onClose: () => void;
  onStartBattle: (p: Pokemon) => void;
}

export const ChoosePokemonBattlePanel: React.FC<ChoosePokemonBattlePanelProps> = ({
  pokemons,
  isOpen,
  onClose,
  onStartBattle,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelect = (p: Pokemon) => {
    setSelectedId(p.id);
  };

  const handleStart = () => {
    const chosen = pokemons.find(p => p.id === selectedId)!;
    onStartBattle(chosen);
    onClose();
    navigate("/fighting-arena");
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="fixed inset-0 bg-opacity-50" />
      <DialogContent className="fixed top-1/2 left-1/2 w-[500px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-white  p-6">
        <div className="flex justify-between items-center mb-4">
          <DialogTitle className="text-heading-lg-regular">Choose the Pokemon to battle with</DialogTitle>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 justify-items-center mb-6">
          {pokemons.map(p => (
            <div
              key={p.id}
              onClick={() => handleSelect(p)}
              className={
                `rounded-full p-1 cursor-pointer transition ring-2 ` +
                (selectedId === p.id
                  ? `ring-blue-500`
                  : `ring-transparent hover:ring-gray-300`)
              }
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-20 w-20 rounded-full object-contain bg-gray-100"
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <GenericButton
            type="primary"
            size="small"
            text="Start battle"
            disabled={!selectedId}
            onClick={handleStart}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
