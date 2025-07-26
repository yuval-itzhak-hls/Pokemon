import { GenericButton } from "@/design-system/generic-componenets/button/GenericButton"; 

type BattlePanelFooterProps = {
  isDisabled?: boolean;
  onStart: () => void;
}

export const BattlePanelFooter = ({
  isDisabled,
  onStart,
} : BattlePanelFooterProps) => {
  return (
    <div className="text-center">
      <GenericButton
        type="primary"
        size="small"
        text="Start battle"
        disabled={isDisabled}
        onClick={onStart}
      />
    </div>
  );
};