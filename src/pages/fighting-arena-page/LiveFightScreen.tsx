// LiveFightScreen.tsx
import React, { useState, useEffect } from "react";
import type { ChosenPokemonDisplayProps } from "./ChosenPokemonsDisplay";
import fightArena from "@/assets/fight-arena.png";
import { AttackButton } from "./AttackButton";
import { LifeBarCard } from "./LifeBarCard";
import { useLifePoints } from "@/hooks/useLifePoints";
import { LostWonPanel } from "./LostWonPanel";
import { usePokemonsData, type Pokemon } from "@/hooks/usePokemonsData";
import { ChoosePokemonBattlePanel } from "../home-page/ChoosePokemonBattlePanel";
import { useNavigate } from "react-router-dom";
import { CatchButton } from "./CatchButton";

const STORAGE_KEY = "myPokemons";

export const LiveFightScreen: React.FC<ChosenPokemonDisplayProps> = ({
  userPokemon,
  opponentPokemon,
}) => {
  const navigate = useNavigate();
  const { userLife, opponentLife, applyAttack, rematch } = useLifePoints();

  const [isUserTurn, setIsUserTurn] = useState(
    userPokemon.speed > opponentPokemon.speed
  );
  const [showChoose, setShowChoose] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [catchTries, setCatchTries] = useState(0);
  const [isAbleCatch, setIsAbleCatch] = useState<boolean>(false);
  const [caught, setCaught] = useState<boolean>(false);

  const maxCatchTries = 3;
  const lowHpThreshold = opponentPokemon.hpLevel * 0.2;

  // Win/Loss derived
  const isWon = caught || opponentLife <= 0;
  const isLost =
    userLife <= 0 ||
    (!isAbleCatch && catchTries >= maxCatchTries);

  useEffect(() => {
    if (isUserTurn) {
      const rate = opponentLife <= lowHpThreshold ? 0.2 : 0.1;
      const canCatch = Math.random() < rate;
      setIsAbleCatch(canCatch);
    }
  }, [isUserTurn, opponentLife, lowHpThreshold]);

  // Show result panel when game ends
  useEffect(() => {
    if (isWon || isLost) {
      setShowResult(true);
    }
  }, [isWon, isLost]);

  const handleAttack = () => {
    applyAttack(isUserTurn);
    setIsUserTurn((t) => !t);
  };

  // Opponent auto-attack
  useEffect(() => {
    if (!isUserTurn && userLife > 0 && opponentLife > 0) {
      const timer = setTimeout(handleAttack, 3000);
      return () => clearTimeout(timer);
    }
  }, [isUserTurn, userLife, opponentLife]);

  const catchPokemon = () => {
    setCatchTries((t) => t + 1);

    if (isAbleCatch) {
      setCaught(true);

      const stored: string[] =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const newList = [...stored, opponentPokemon.id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));

      // tell all hooks/components to reload
      window.dispatchEvent(new Event("myPokemonsUpdated"));
    }
  };

  const onEndMatch = () => navigate("/home-page");
  const onSwitchPokemon = () => {
    setShowChoose(true);
    setShowResult(false);
    setCatchTries(0);
    setIsAbleCatch(false);
    setCaught(false);
  };
  const onRematch = () => {
    rematch();
    setShowResult(false);
    setCatchTries(0);
    setIsAbleCatch(false);
    setCaught(false);
  };

  const { pokemons: allPokemons } = usePokemonsData({
    showMyPokemons: false,
    searchTerm: "",
    sortOption: "alpha-asc",
    rowsPerPage: 999,
  });
  const { pokemons: myPokemons } = usePokemonsData({
    showMyPokemons: true,
    searchTerm: "",
    sortOption: "alpha-asc",
    rowsPerPage: 999,
  });

  if (showChoose) {
    return (
      <ChoosePokemonBattlePanel
        myPokemons={myPokemons as Pokemon[]}
        allPokemons={allPokemons as Pokemon[]}
        isOpen={true}
        onClose={() => setShowChoose(false)}
      />
    );
  }
  if (!userPokemon || !opponentPokemon) return null;

  return (
    <div
      className="relative mx-auto w-[90%] h-[400px] md:h-[400px] lg:h-[650px] bg-cover bg-center"
      style={{ backgroundImage: `url(${fightArena})` }}
    >
      {/* Opponent life bar */}
      <LifeBarCard
        name={opponentPokemon.name}
        speed={opponentPokemon.speed}
        life={opponentLife}
        max={opponentPokemon.hpLevel}
        isActive={!isUserTurn}
        className="absolute top-4 right-4"
      />

      {/* User life bar */}
      <LifeBarCard
        name={userPokemon.name}
        speed={userPokemon.speed}
        life={userLife}
        max={userPokemon.hpLevel}
        isActive={isUserTurn}
        className="absolute bottom-4 left-4"
      />

      {/* pokemons and attack button */}
      <img
        src={userPokemon.image}
        alt="Your Pokémon"
        className="absolute left-[20%] top-[60%] w-1/3 md:w-1/4 lg:w-[20%] h-[30%] object-contain transform -translate-y-1/4"
      />
      <img
        src={opponentPokemon.image}
        alt="Opponent Pokémon"
        className="absolute right-[25%] top-[30%] w-1/3 md:w-1/4 lg:w-[20%] h-[30%] object-contain transform -translate-y-3/4"
      />

      {/* Attack button */}
      <div
        className={`absolute bottom-4 right-[14%] ${
          !isUserTurn ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <AttackButton onClick={handleAttack} hover={isUserTurn} visible={isUserTurn} />
      </div>

      {/* Catch button (only on user turn) */}
      {isUserTurn && (
        <div className="absolute bottom-4 right-[3%]">
          <CatchButton
            onClick={catchPokemon}
            shakeCount={isAbleCatch === false ? catchTries : 0}
            vibrate={isAbleCatch}
          />
        </div>
      )}

      {/* Win/Loss panel */}
      <LostWonPanel
        open={showResult}
        onOpenChange={setShowResult}
        name={isLost ? userPokemon.name : opponentPokemon.name}
        sprite={isLost ? userPokemon.image : opponentPokemon.image}
        result={isLost ? "lost" : "won"}
        onSwitch={onSwitchPokemon}
        onRematch={onRematch}
        onEnd={onEndMatch}
      />
    </div>
  );
};
