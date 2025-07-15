import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

export interface PokemonDetails {
  id: string;
  name: string;
  image: string;
  description: string;
  height: string;
  weight: string;
  category: string;
  abilities: string[];
}

interface PokemonDetailsPanelProps {
  pokemon: PokemonDetails;
  isOpen: boolean;
  onClose: () => void;
}

export const PokemonDetailsPanel: React.FC<PokemonDetailsPanelProps> = ({
  pokemon,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="fixed inset-0  bg-opacity-5" />
      <DialogContent className="fixed top-1/2 left-1/2 w-[500px] max-w-[600px] h-[600px] max-h-[500px overflow-y-auto bg-white">
        {/* Header */}
        <div className="flex flex-col">
            <span className="text-sm text-gray-400">#{pokemon.id}</span>
            <h2 className="text-heading-lg-regular mt-1 text-gray-800">{pokemon.name}</h2>
        </div>

        <div className="p-6 text-left">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="mx-auto h-[160px] w-[470px] object-contain"
          />
        </div>

        {/* Description and Details */}
        <div className="bg-primary-50 p-6 ">
          <p className="text-gray-700 mb-6">
            {pokemon.description}
          </p>
          <div className="border-t border-gray-400 pt-4 grid grid-cols-2 md:grid-cols-4 gap-y-4">
            <div className="text-center">
              <div className="text-body-regular text-gray-500">Height</div>
              <div className="mt-1 text-subheading-regular text-gray-800">{pokemon.height}</div>
            </div>
            <div className="text-center">
              <div className="text-body-regular text-gray-500">Weight</div>
                <div className="mt-1 text-subheading-regular text-gray-800">{pokemon.weight}</div>
            </div>
            <div className="text-center">
              <div className="text-body-regular text-gray-500 ">Category</div>
              <div className="mt-1 text-subheading-regular text-gray-800">{pokemon.category}</div>
            </div>
            <div className="text-center">
              <div className="text-body-regular text-gray-500 ">Abilities</div>
              <div className="mt-1 text-subheading-regular text-gray-800">
                {pokemon.abilities.join(", ")}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
