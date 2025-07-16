import React from "react";
import fightArenaImage from "@/assets/fight-arena.png"; 

type FightArenaLayoutProps = {
  children: React.ReactNode;
};

export const FightArenaLayout = ({ children }: FightArenaLayoutProps) => {
  return (
    <div
      className="relative mx-auto w-[97%] h-[400px] md:h-[400px] lg:h-[700px] bg-auto bg-repeat-round"
      style={{ backgroundImage: `url(${fightArenaImage})` }}
    >
      {children}
    </div>
  );
};