import React from "react";
import { GenericButton } from "@/design-system/generic-componenets/GenericButton";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type Result = "won" | "lost";

interface BattleResultPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  sprite: string;
  result: Result;
  onRematch: () => void;
  onSwitch?: () => void;  
  onEnd: () => void;
}

export const LostWonPanel: React.FC<BattleResultPanelProps> = ({
  open,
  onOpenChange,
  name,
  sprite,
  result,
  onRematch,
  onSwitch,
  onEnd,
}) => {

  const titleText =
    result === "won" ? `You won ${name}!` : `${name} lost the match`;

  const primary = {
    label: result === "won" ? "Battle Another Pokemon" : "Switch Pokemon",
    onClick: result === "won" ? onRematch : onSwitch!,
   size: result === "won" ? "medium" : "medium",
    type: result === "won" ? "primary" : "primary",
  } as const;

  return (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogOverlay className="fixed inset-0 bg-opacity-50" />
    <DialogContent className="fixed top-1/2 left-1/2 w-[500px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-white p-5 ">
      <div className="flex justify-between items-center mb-4">
        <DialogTitle> {titleText}</DialogTitle>
      </div>

      <div className="flex justify-center py-1 ">
        <img src={sprite} alt={name} className="h-32 w-32 object-contain" />
      </div>

      <Separator />

      <div className="flex items-center justify-center py-0 space-x-3">
        <GenericButton
            onClick={() => {
              primary.onClick();
              onOpenChange(false);
            }}
            type={primary.type}
            size={primary.size}
            text={primary.label}
          />
        <GenericButton
          onClick={() => {
            onEnd();
            onOpenChange(false);
          }}
          type="secondary"
          size="small"
          text="End Match"
        />
      </div>
    </DialogContent>
  </Dialog>
)};
