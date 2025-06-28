import React from "react";
import { GenericButton } from "@/design-system/generic-componenets/GenericButton";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface LostPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  sprite: string;
  onSwitch: () => void;
  onEnd: () => void;
}

export const LostPanel: React.FC<LostPanelProps> = ({
  open,
  onOpenChange,
  name,
  sprite,
  onSwitch,
  onEnd,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogOverlay className="fixed inset-0 bg-opacity-50" />
    <DialogContent className="fixed top-1/2 left-1/2 w-[500px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-white p-5 ">
      <div className="flex justify-between items-center mb-4">
        <DialogTitle className="text-heading-lg-regular">{name} lost the match</DialogTitle>
      </div>

      <div className="flex justify-center py-1 ">
        <img src={sprite} alt={name} className="h-32 w-32 object-contain" />
      </div>

      <Separator />

      <div className="flex items-center justify-center py-0 space-x-3">
        <GenericButton
          onClick={onSwitch}
          type="primary"
          size="medium"
          text="Switch Pokemon"
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
);
