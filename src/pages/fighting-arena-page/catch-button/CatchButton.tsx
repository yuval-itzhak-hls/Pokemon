import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import closePokemon from "@/assets/close-pokemon.png";

type CatchButtonProps = {
  onClick: () => Promise<void>;
  isAbleCatch?: boolean;
};

export const CatchButton = ({
  onClick,
  isAbleCatch = false,
}:CatchButtonProps) => {
  const controls = useAnimation();

  //auto-vibrate when isAbleCatch===true
  useEffect(() => {
    if (isAbleCatch) {
      controls.start({
        x: [0, -30, 30, -15, 15, 0],
        rotate: [0, -10, 10, -6, 6, 0],
        scale: [1, 1.1, 1, 1.1, 1],
        transition: { duration: 0.7, ease: "easeInOut" },
      });
    }
  }, [isAbleCatch]);

  const handleClick = async () => {
    //  Manually shake if not catchable 
    if (!isAbleCatch) {
      await controls.start({
        x: [0, -30, 30, -15, 15, 0],
        rotate: [0, -10, 10, -6, 6, 0],
        scale: [1, 1.1, 1, 1.1, 1],
        transition: { duration: 0.7, ease: "easeInOut" },
      });
    }

    await onClick();
  };

  return (
    <motion.button
      onClick={handleClick}
      animate={controls}
      className="flex flex-col items-center justify-center w-32 h-32 rounded-full bg-catch-button border-2 border-black cursor-pointer hover:scale-105 transition-transform hover:border-blue-500"
    >
      <img src={closePokemon} alt="Poké Ball" className="w-[55px] h-[55px]" />
      <span className="text-stroke mt-1 text-xl font-bold font-mulish">
        Catch
      </span>
    </motion.button>
  );
};
