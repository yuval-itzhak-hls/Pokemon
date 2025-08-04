import { useState, useEffect } from "react";
import { ChosenPokemonDisplay } from "./chosen-pokemon-display/ChosenPokemonsDisplay";
import { useBattle } from "@/context/BattleContext";
import { LiveFightScreen } from "./live-fight/LiveFightScreen";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Simple loader spinner component
const LoaderSpinner = () => (
  <div className="flex flex-col items-center justify-center h-[60vh]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 mb-4"></div>
    <span className="text-blue-600 text-lg font-semibold">Loading...</span>
  </div>
);

export const FightArenaPage = () => {
  const { userPokemon, opponentPokemon } = useBattle();
  const [showChosen, setShowChosen] = useState(true);
  const navigate = useNavigate();

  //after mount, wait and then hide the chosen display screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChosen(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!userPokemon || !opponentPokemon) {
      navigate("/all-pokemons");
    }
  }, [userPokemon, opponentPokemon, navigate]);

  if (!userPokemon || !opponentPokemon) {
    return <LoaderSpinner />;
  }

  return (
    <div className="text-center">
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
