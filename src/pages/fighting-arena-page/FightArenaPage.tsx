import React, { useState, useEffect } from "react";
import { ChosenPokemonDisplay } from "./ChosenPokemonsDisplay";
import { useBattle } from "@/context/BattleContext";
import { LiveFightScreen } from "./LiveFightScreen";
import { AnimatePresence, motion } from "framer-motion";

export const FightArenaPage: React.FC = () => {
  const { userPokemon, opponentPokemon } = useBattle();
  const [showChosen, setShowChosen] = useState(true);

  //after mount, wait and then hide the chosen display screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChosen(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!userPokemon || !opponentPokemon) {
    return null;
  }

  return (
    <div className="space-y-6 text-center">
      <div className="px-4">
        <h2 className="text-heading-xl-bold text-gray-700">
          Fighting arena
        </h2>
        <p className="mt-1 text-heading-md-regular text-gray-700">
          Start fighting against your opponent to win the battle
        </p>
      </div>

      <AnimatePresence mode="wait">
        {showChosen ? (
          <motion.div
            key="chosen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <ChosenPokemonDisplay
              userPokemon={userPokemon}
              opponentPokemon={opponentPokemon}
            />
          </motion.div>
        ) : (
          <motion.div
            key="live"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <LiveFightScreen  
              userPokemon={userPokemon}
              opponentPokemon={opponentPokemon}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
