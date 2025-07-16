
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useBattle } from "@/context/BattleContext";
import { useLifePoints } from "@/hooks/useLifePoints";
import { usePokemonsData, type Pokemon } from "@/hooks/usePokemonsData"; 
import { Status } from "../messages/FightMessage";

import {
  LOCAL_STORAGE_MY_POKEMONS_KEY,
  MY_POKEMONS_UPDATED_EVENT,
  BattleConfig,
  DefaultValues,
  type BattleResult,
} from "./consts";

type UseBattleLogicProps = {
  initialUserPokemon: Pokemon;
  initialOpponentPokemon: Pokemon;
};


export const useBattleLogic = (props: UseBattleLogicProps) => {
  const { initialUserPokemon, initialOpponentPokemon } = props;

  const { setBattle } = useBattle();
  const navigate = useNavigate();
  const { userLife, opponentLife, applyAttack, rematch } = useLifePoints();

  // --- Battle State ---
  const [isUserTurn, setIsUserTurn] = useState<boolean>(
    initialUserPokemon.speed > initialOpponentPokemon.speed
  );
  const [currentFightStatus, setCurrentFightStatus] = useState<Status>(
    DefaultValues.InitialCaught ? Status.switch : Status.start
  );
  const [isUserAttacked, setIsUserAttacked] = useState<boolean>(
    DefaultValues.InitialUserAttacked
  );
  const [isOpponentAttacked, setIsOpponentAttacked] = useState<boolean>(
    DefaultValues.InitialOpponentAttacked
  );

  // --- Panel/Modal State ---
  const [showChoosePokemonPanel, setShowChoosePokemonPanel] =
    useState<boolean>(false);
  const [showBattleResultPanel, setShowBattleResultPanel] =
    useState<boolean>(false);
  const [showCatchPanel, setShowCatchPanel] = useState<boolean>(
    DefaultValues.InitialCaught
  );

  // --- Catching State ---
  const [catchAttemptCount, setCatchAttemptCount] = useState<number>(
    DefaultValues.InitialCatchTries);
  const [canAttemptCatch, setCanAttemptCatch] = useState<boolean>(
    DefaultValues.InitialIsAbleCatch);
  const [isPokemonCaught, setIsPokemonCaught] = useState<boolean>(
    DefaultValues.InitialCaught);

  // --- Pokemon Switching State ---
  const [selectedSwitchPokemonId, setSelectedSwitchPokemonId] = useState<string | undefined>(DefaultValues.DefaultId);
  const [isSwitchingPokemon, setIsSwitchingPokemon] = useState<boolean>(DefaultValues.InitialIsSwitch);
  const [currentUserPokemon, setCurrentUserPokemon] = useState<Pokemon>(initialUserPokemon);

  // --- Derived State ---
  const opponentLowHpThreshold: number = initialOpponentPokemon.hpLevel * 0.2;
  const isBattleWon: boolean = opponentLife <= 0;
  const isBattleLost: boolean =
    userLife <= 0 ||
    (!canAttemptCatch && catchAttemptCount >= BattleConfig.CatchTriesLimit);

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

  const pokemonSwitchOptions = myPokemons
    .filter((p) => p.id.toString() !== currentUserPokemon.id.toString())
    .filter((p) => p.hpLevel !== null)
    .map((p) => ({
      value: p.id.toString(),
      label: p.name,
      subLabel: p.speed,
      img: p.image,
      disabled: false,
    }));

  const currentBattleResult: BattleResult = isBattleLost ? "lost" : "won";

  const catchRewards = {
    speed: initialOpponentPokemon.speed,
    category: Array.isArray(initialOpponentPokemon.type)
      ? initialOpponentPokemon.type.join(", ")
      : initialOpponentPokemon.type || "Unknown",
    abilities: initialOpponentPokemon.abilities.join(", "),
  };


  const handleAttack = useCallback((): void => {
    setCurrentFightStatus(Status.attack);
    setIsUserAttacked(isUserTurn);
    setIsOpponentAttacked(!isUserTurn);
    applyAttack(isUserTurn);
    setIsUserTurn((prevTurn) => !prevTurn);
  }, [isUserTurn, applyAttack]);



  // Initialize fight status and current user pokemon
  useEffect(() => {
    setCurrentFightStatus(DefaultValues.InitialCaught ? Status.switch : Status.start);
    setCurrentUserPokemon(initialUserPokemon); 
  }, [initialUserPokemon]); 



  // Logic for enabling catch button and updating fight status
  useEffect(() => {
    if (isPokemonCaught) {
      setCurrentFightStatus(Status.caught);
      setShowCatchPanel(true);
      return;
    }
    if (isBattleWon && !isPokemonCaught) {
      setShowBattleResultPanel(true);
      setCurrentFightStatus(Status.critical);
      return;
    }

    if (!isBattleWon && !isBattleLost) {
      if (isUserTurn) {
        const catchRate: number =
          opponentLife <= opponentLowHpThreshold
            ? BattleConfig.LowHpCatchRate
            : BattleConfig.HighHpCatchRate;
        const canCatch: boolean = Math.random() < catchRate;
        setCanAttemptCatch(canCatch);

        if (currentFightStatus !== Status.start && currentFightStatus !== Status.switch) {
          setCurrentFightStatus(Status.yourTurn);
        }
      } else {
        if (currentFightStatus !== Status.start && currentFightStatus !== Status.switch) {
          setCurrentFightStatus(Status.attack);
        }
      }
    }
  }, [
    isUserTurn,
    opponentLife,
    opponentLowHpThreshold,
    currentFightStatus,
    isPokemonCaught,
    isBattleWon,
    isBattleLost,
  ]);

  // Handle showing battle result panel with delay
  useEffect(() => {
    if (isBattleWon || isBattleLost) {
      const timer = setTimeout(() => {
        setShowBattleResultPanel(true);
      }, BattleConfig.ResultPanelDelayMs);
      return () => clearTimeout(timer);
    } else {
      setShowBattleResultPanel(false);
    }
  }, [isBattleWon, isBattleLost]);


  // Opponent auto-attack 
  useEffect(() => {
    let timer: NodeJS.Timeout; 

    if (!isUserTurn && userLife > 0 && opponentLife > 0 && !showBattleResultPanel) {
      setIsUserAttacked(false);
      setIsOpponentAttacked(true);
      timer = setTimeout(handleAttack, BattleConfig.OpponentAttackDelayMs);
    } else {
      setIsOpponentAttacked(false);
    }

    return () => clearTimeout(timer);
  }, [isUserTurn, userLife, opponentLife, showBattleResultPanel, handleAttack]);




  const handleCatchPokemon = useCallback((): void => {
    setCatchAttemptCount((prevCount) => prevCount + 1);

    if (canAttemptCatch) {
      setIsPokemonCaught(true);
      setCurrentFightStatus(Status.caught);
      setShowCatchPanel(true);

      const storedPokemonIds: string[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_MY_POKEMONS_KEY) || "[]"
      );
      const updatedPokemonIds = [...storedPokemonIds, initialOpponentPokemon.id];
      localStorage.setItem(
        LOCAL_STORAGE_MY_POKEMONS_KEY,
        JSON.stringify(updatedPokemonIds)
      );

      window.dispatchEvent(new Event(MY_POKEMONS_UPDATED_EVENT));
    } else {
      setCurrentFightStatus(Status.disCatchable);
      setIsUserTurn(false); 
    }
  }, [canAttemptCatch, initialOpponentPokemon.id]);


  const handleEndMatch = useCallback((): void => {
    navigate("/my-pokemons");
  }, [navigate]);


  const handleSwitchPokemon = useCallback((): void => {
    setShowChoosePokemonPanel(true);
    setShowBattleResultPanel(false);
    setCatchAttemptCount(DefaultValues.InitialCatchTries);
    setCanAttemptCatch(DefaultValues.InitialIsAbleCatch);
    setIsPokemonCaught(DefaultValues.InitialCaught);
    setCurrentFightStatus(Status.start);
  }, []);


  const handleRematch = useCallback((): void => {
    rematch();
    setShowBattleResultPanel(false);
    setCatchAttemptCount(DefaultValues.InitialCatchTries);
    setCanAttemptCatch(DefaultValues.InitialIsAbleCatch);
    setIsPokemonCaught(DefaultValues.InitialCaught);
    setCurrentFightStatus(Status.switch);
    setIsSwitchingPokemon(false);
  }, [rematch]);


  const handleContinueBattle = useCallback((): void => {
    setShowCatchPanel(false);
    handleRematch();
  }, [handleRematch]);


  const handleSwitchPokemonSelection = useCallback(
    (newId: string): void => {
      setSelectedSwitchPokemonId(newId);
      const chosen = myPokemons.find((p) => p.id.toString() === newId);
      if (!chosen) return;

      setCurrentUserPokemon(chosen);
      setIsPokemonCaught(DefaultValues.InitialCaught);
      setCatchAttemptCount(DefaultValues.InitialCatchTries);
      setCanAttemptCatch(DefaultValues.InitialIsAbleCatch);
      setIsSwitchingPokemon(true);

      //TODO : i need to check if the hp of the opponent pokemon needs to be initialize
      setBattle(chosen, initialOpponentPokemon); 
      setCurrentFightStatus(Status.switch);
      setShowChoosePokemonPanel(false);
    },
    [myPokemons, initialOpponentPokemon, setBattle]
  );

  return {
    userLife,
    opponentLife,
    isUserTurn,
    currentFightStatus,
    isUserAttacked,
    isOpponentAttacked,
    showChoosePokemonPanel,
    showBattleResultPanel,
    showCatchPanel,
    catchAttemptCount,
    canAttemptCatch,
    isPokemonCaught,
    selectedSwitchPokemonId,
    isSwitchingPokemon,
    currentUserPokemon,
    isBattleWon,
    isBattleLost,
    allPokemons, 
    myPokemons,
    pokemonSwitchOptions,
    currentBattleResult,
    catchRewards,
    handleAttack,
    handleCatchPokemon,
    handleEndMatch,
    handleSwitchPokemon,
    handleRematch,
    handleContinueBattle,
    handleSwitchPokemonSelection,
    setShowChoosePokemonPanel,
    setShowCatchPanel,
    setShowBattleResultPanel, 
    
  };
};