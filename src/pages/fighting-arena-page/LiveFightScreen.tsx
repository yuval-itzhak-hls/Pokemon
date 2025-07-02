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
import CatchPanel from "./CatchPanel";
import closePokemon from "@/assets/close-pokemon.png"
import { Status, FightMessage } from "./messages/FightMessage";
import { MessageCard } from "./messages/MessageCard";
import { GenericDropDown } from "@/design-system/generic-componenets/GenericDropDown";
import type { Options } from "@/design-system/generic-componenets/GenericDropDown";
import { useBattle } from "@/context/BattleContext";
import { ShakyImage } from "../ShakyImage";


const STORAGE_KEY = "myPokemons";


export const LiveFightScreen: React.FC<ChosenPokemonDisplayProps> = ({
  userPokemon,
  opponentPokemon,
}) => {
  const { setBattle } = useBattle();
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
  const [status, setStatus] = useState<Status>(Status.start);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [isSwitch, setIsSwitch] = useState<boolean>(false);
  const [newUserPokemon, setNewUserPokemon] = useState<Pokemon>(userPokemon);
  const [userAttacked, setUserAttacked] = useState<boolean>(false);
  const [opponentAtacked, setOpponentAtacked] = useState<boolean>(false);



  const maxCatchTries = 3;
  const lowHpThreshold = opponentPokemon.hpLevel * 0.2;

  const isWon = opponentLife <= 0;
  const isLost =
    userLife <= 0 || (!isAbleCatch && catchTries >= maxCatchTries);

  useEffect(()=>{
      setStatus(Status.start);
      if (caught){
        setStatus(Status.switch);
      }
  }, []);

  useEffect(() => { 
    if (isUserTurn) {
      const rate = opponentLife <= lowHpThreshold ? 0.2 : 0.1;
      const canCatch = Math.random() < rate + 0.4;
      setIsAbleCatch(canCatch);
      if (status !== Status.start && status !== Status.switch ){
        setStatus(Status.yourTurn)
      }
    }
  }, [isUserTurn, opponentLife, lowHpThreshold]);

  useEffect(() => {
    if (isWon || isLost) {
      setShowResult(true);
      if (isLost){
        setStatus(Status.critical)
      }
    }
  }, [isWon, isLost]);

  const handleAttack = () => {
    setStatus(Status.attack);
    setUserAttacked(!isUserTurn);
    setOpponentAtacked(isUserTurn);
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
      setStatus(Status.caught);

      const stored: string[] =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const newList = [...stored, opponentPokemon.id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));

      //tell all hooks/components to reload
      window.dispatchEvent(new Event("myPokemonsUpdated"));
    }else{
      setStatus(Status.disCatchable);
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
    setStatus(Status.switch);
  };


  const onContinueBattle = () => {
    rematch();
    setCatchTries(0);
    setIsAbleCatch(false);
    setCaught(false);
    setStatus(Status.switch);
  };

  const handleSwitchSelection = (newId: string) => {
      setSelectedId(newId);
      const chosen = myPokemons.find((p) => p.id.toString() === newId);
      if (!chosen) return;
      setNewUserPokemon(chosen)
      setCaught(false);
      setCatchTries(0);
      setIsAbleCatch(false);
      setIsSwitch(true);
      setBattle(chosen ,opponentPokemon);
      
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

   const pokemonOptions: Options[] = myPokemons.map((p) => ({
    value: p.id.toString(),
    label: p.name,
    subLabel: p.speed,
    img: p.image,
    disabled: false,
  }));

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
    <div>
      <div className="m-2 pl-3">
        <GenericDropDown
          placeholder={newUserPokemon.name}
          options={pokemonOptions}
          value={selectedId}
          onValueChange={handleSwitchSelection}
          className="w-[258px] "
          disabled={isSwitch ? true : false}
          isSearch={true}
        />
      </div>
      <div
        className="relative mx-auto w-[97%] h-[400px] md:h-[400px] lg:h-[700px] bg-auto bg-repeat-round "
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
        <ShakyImage
          src={userPokemon.image}
          alt="Your Pokemon"
          shouldShake={userAttacked}
          className="absolute left-[20%] top-[60%] w-1/3 md:w-1/4 lg:w-[20%] h-[30%] object-contain transform -translate-y-1/4"
        />
        <ShakyImage
          src={!caught ? opponentPokemon.image : closePokemon}
          alt="Opponent Pokemon"
          shouldShake={opponentAtacked}
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
              isAbleCatch={isAbleCatch}
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

        { caught && (
            <CatchPanel
          isOpen={caught}
          onClose={() => setCaught(false)}
          onContinue={onContinueBattle}
          onEnd={onEndMatch}
          name={opponentPokemon.name}
          imageSrc={opponentPokemon.image}
          rewards={{
            speed: opponentPokemon.speed,
            category: Array.isArray(opponentPokemon.type)
            ? opponentPokemon.type.join(", ")
            : opponentPokemon.type || "Unknown",
            abilities: opponentPokemon.abilities.join(", "),
          }}
        />
        )}

        <div className="absolute top-[9%] left-1/5 transform ">
        <MessageCard>
          <FightMessage
            status={status}
            attackerName={
              isUserTurn ? userPokemon.name : opponentPokemon.name
            }
            defenderName={
              isUserTurn ? opponentPokemon.name : userPokemon.name
            }
          />
        </MessageCard>
        
      </div>
    </div>    
  </div>
  );
};
