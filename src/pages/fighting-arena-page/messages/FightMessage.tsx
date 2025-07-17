import { useEffect, useState } from "react";
import clsx from "clsx";

export const Status = {
  start:        "START",
  attack:       "ATTACK",
  yourTurn:     "YOURTURN",
  critical:     "CRITICAL",
  disCatchable: "DISCATCHABLE",
  caught:       "CAUGHT",
  switch:        "SWITCH",
} as const;

export type Status = typeof Status[keyof typeof Status];

type FightMessageProps = {
  status: Status;
  attackerName?: string;
  defenderName?: string;
}

export const FightMessage = ({
  status,
  attackerName = "",
  defenderName = "",
}: FightMessageProps) => {
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const messages: Record<Status, string> = {
      [Status.start]:        `${attackerName} starts the fight!`,
      [Status.attack]:       `${attackerName} attacks!`,
      [Status.yourTurn]:     `Your turn.`,
      [Status.critical]:     `Critical hit! ${attackerName} faint!`,
      [Status.disCatchable]: `You can’t catch ${defenderName} yet.`,
      [Status.caught]:       `You caught ${defenderName}!`,
      [Status.switch]:        `${defenderName} entered the battle!`,
    };

    setMsg(messages[status] ?? "");
  }, [status, attackerName, defenderName]);

  return (
    <div className={clsx("pb-10 text-heading-lg-bold ",
      status === Status.critical ? "text-red-500" : "text-neutral-800" 
    )}>
      {msg}
    </div>
  );
};
