
import { LifeBarCard } from "../life-bar/LifeBarCard";
import { AttackButton } from "../attack-button/AttackButton";
import { CatchButton } from "../catch-button/CatchButton";
import CatchPanel from "../catch-panel/CatchPanel"; 
import { LostWonPanel } from "../lost-won-panel/LostWonPanel";
import { ChoosePokemonBattlePanel } from "../../home-page/choose-pokemon-panel/ChoosePokemonBattlePanel";
import { ShakyImage } from "../../utils/ShakyImage";
import { GenericDropDown } from "@/design-system/generic-componenets/drop-down/GenericDropDown";

import { FightArenaLayout } from "./FightArenaLayout";
import { FightMessageDisplay } from "./FightMessageDisplay";

import type { LiveFightScreenProps } from "./types";
import { SwitchPokemonDropdownPlaceholder } from "./consts";
import closePokemonImage from "@/assets/close-pokemon.png"; 

import { useBattleLogic } from "./useBattleLogic"; 

export const LiveFightScreen = (props: LiveFightScreenProps) => {
  const { userPokemon, opponentPokemon } = props;

  const {
    userLife,
    opponentLife,
    isUserTurn,
    currentFightStatus,
    isUserAttacked,
    isOpponentAttacked,
    showChoosePokemonPanel,
    showBattleResultPanel,
    showCatchPanel,
    canAttemptCatch,
    isPokemonCaught,
    selectedSwitchPokemonId,
    isSwitchingPokemon,
    currentUserPokemon,
    isBattleLost,
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
  } = useBattleLogic({ initialUserPokemon: userPokemon, initialOpponentPokemon: opponentPokemon });


  if (!userPokemon || !opponentPokemon) {
    return null;
  }

  // Become true when the user lost the battle
  if (showChoosePokemonPanel) {
    console.log("user lost");
    return (
      <ChoosePokemonBattlePanel
        userPokemon={userPokemon}
        isOpen={true}
        onClose={() => setShowChoosePokemonPanel(false)}
      />
    );
  }

  return (
    <div>
      {/* Pokemon Switch Dropdown */}
      <div className="mx-2 mb-2 mt-0 pl-3">
        <GenericDropDown
          placeholder={currentUserPokemon.name || SwitchPokemonDropdownPlaceholder}
          options={pokemonSwitchOptions}
          value={selectedSwitchPokemonId}
          onValueChange={handleSwitchPokemonSelection}
          className="w-[258px]"
          disabled={isSwitchingPokemon}
          isSearch={true}
        />
      </div>

      {/* Main Fight Arena Layout */}
      <FightArenaLayout>

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
          name={currentUserPokemon.name}
          speed={currentUserPokemon.speed}
          life={userLife}
          max={currentUserPokemon.hpLevel}
          isActive={isUserTurn}
          className="absolute bottom-4 left-4"
        />

        <ShakyImage
          src={currentUserPokemon.image}
          alt="Your Pokemon"
          shouldShake={isUserAttacked}
          className="absolute left-[20%] top-[60%] w-1/3 md:w-1/4 lg:w-[20%] h-[30%] object-contain transform -translate-y-1/4"
        />
        <ShakyImage
          src={!isPokemonCaught ? opponentPokemon.image : closePokemonImage}
          alt="Opponent Pokemon"
          shouldShake={isOpponentAttacked}
          className="absolute right-[25%] top-[30%] w-1/3 md:w-1/4 lg:w-[20%] h-[30%] object-contain transform -translate-y-3/4"
        />

      {isUserTurn && (
        <div className="absolute bottom-4 right-[14%]">
          <AttackButton
            onClick={handleAttack}
            hover={isUserTurn}
            visible={isUserTurn}
          />
        </div>
      )}

        {isUserTurn && (
          <div className="absolute bottom-4 right-[3%]">
            <CatchButton
              onClick={handleCatchPokemon}
              isAbleCatch={canAttemptCatch}
            />
          </div>
        )}

        <FightMessageDisplay
          status={currentFightStatus}
          attackerName={isUserTurn ? currentUserPokemon.name : opponentPokemon.name}
          defenderName={isUserTurn ? opponentPokemon.name : currentUserPokemon.name}
        />
      </FightArenaLayout>

      {/* Panels/Modals */}
      <LostWonPanel
        open={showBattleResultPanel}
        onOpenChange={setShowBattleResultPanel}
        name={isBattleLost ? currentUserPokemon.name : opponentPokemon.name}
        sprite={isBattleLost ? currentUserPokemon.image : opponentPokemon.image}
        result={currentBattleResult}
        onSwitch={handleSwitchPokemon}
        onRematch={handleRematch}
        onEnd={handleEndMatch}
      />

      {isPokemonCaught && (
        <CatchPanel
          isOpen={showCatchPanel}
          onClose={() => setShowCatchPanel(false)}
          onContinue={handleContinueBattle}
          onEnd={handleEndMatch}
          name={opponentPokemon.name}
          imageSrc={opponentPokemon.image}
          rewards={catchRewards}
        />
      )}
    </div>
  );
};