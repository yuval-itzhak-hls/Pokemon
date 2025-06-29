// CatchButton.tsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import pokemonClose from "@/assets/close-pokemon.png";

interface CatchButtonProps {
  onClick: () => void;
  /** triggers the shake animation for failed attempts */
  shakeCount?: number;
  /** if true: auto-vibrate on render; if false: vibrate only on click */
  vibrate?: boolean;
}

export const CatchButton: React.FC<CatchButtonProps> = ({
  onClick,
  shakeCount = 0,
  vibrate = false,
}) => {
  const controls = useAnimation();

  // auto-vibrate when vibrate===true
  useEffect(() => {
    if (vibrate) {
      controls.start({
        x: [0, -30, 30, -15, 15, 0],
        rotate: [0, -10, 10, -6, 6, 0],
        scale: [1, 1.1, 1, 1.1, 1],
        transition: { duration: 0.7, ease: "easeInOut" },
      });
    }
  }, [vibrate, controls]);

  // wrap the click so that, if vibrate is false, we vibrate on click
  const handleClick = () => {
    if (!vibrate) {
      controls.start({
        x: [0, -30, 30, -15, 15, 0],
        rotate: [0, -10, 10, -6, 6, 0],
        scale: [1, 1.1, 1, 1.1, 1],
        transition: { duration: 0.7, ease: "easeInOut" },
      });
    }
    onClick();
  };

  return (
    <motion.button
      onClick={handleClick}
      animate={controls}
      className="flex flex-col items-center justify-center w-32 h-32 rounded-full bg-catch-button border-2 border-black  cursor-pointer hover:scale-105 transition-transform hover:border-blue-500"
    >
      <img src={pokemonClose} alt="Poké Ball" className="w-12 h-12" />
      <span className="text-lg font-bold uppercase mt-1 border-black">Catch</span>
    </motion.button>
  );
};
