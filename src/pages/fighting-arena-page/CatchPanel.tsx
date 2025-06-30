import React from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import closePokemon from "@/assets/close-pokemon.png"
import { GenericButton } from "@/design-system/generic-componenets/GenericButton";
import { Separator } from "@/components/ui/separator";


interface CatchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  onEnd: () => void;
  name: string;
  imageSrc: string;
  rewards: {
    speed: number;
    category: string;
    abilities: string;
  };
}

const CatchPanel: React.FC<CatchPanelProps> = ({
  isOpen,
  onClose,
  onContinue,
  onEnd,
  name,
  imageSrc,
  rewards,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogOverlay className="fixed inset-0 bg-opacity-50 " />
        <DialogContent className="fixed top-1/2 left-1/2 w-[500px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-none ">
          <div className="flex items-center mb-1 space-x-2">
            <DialogTitle> You caught {name}!</DialogTitle>
            <img src={closePokemon} alt={name} className="h-6 w-6 object-contain " />
          </div>

          <div className="flex justify-center py-1 ">
           <img src={imageSrc} alt={name} className="h-32 w-32 object-contain" />
          </div>

          {/* Rewards Section */}
          <div className="mt-1 bg-gray-100 p-4  rounded-none">
            <h3 className="text-heading-md-bold text-gray-700 m-4">
              Rewards Earned
            </h3>
            <div className="grid grid-cols-3 text-leftv pl-4">
              <div>
                <p className="text-body-regular text-gray-600">Speed</p>
                <p className="text-gray-700 text-heading-md-regular">{rewards.speed}</p>
              </div>
              <div>
                <p className="text-body-regular text-gray-600">Category</p>
                <p className="text-gray-700 text-heading-md-regular">{rewards.category}</p>
              </div>
              <div>
                <p className="text-body-regular text-gray-600">Abilities</p>
                <p className="text-gray-700 text-heading-md-regular">{rewards.abilities}</p>
              </div>
            </div>
          </div>

        <Separator/>


    
          <div className="flex items-center justify-center py-0 space-x-3">
                  <GenericButton
                      onClick={() => {
                        onContinue();
                      }}
                      type="primary"
                      size="medium"
                      text="Continue Battle"
                    />
                  <GenericButton
                    onClick={() => {
                      onEnd();
                      onClose();
                    }}
                    type="secondary"
                    size="small"
                    text="End Match"
                  />
                </div>
        </DialogContent>
    </Dialog>
  );
};

export default CatchPanel;

