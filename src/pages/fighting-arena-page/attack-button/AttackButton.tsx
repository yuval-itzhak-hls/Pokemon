import { Button } from "@/components/ui/button";

export interface AttackButtonProps {
  onClick: () => void;
  hover?: boolean;
  visible?: boolean;
  label?: string;
}

export function AttackButton({
  onClick,
  hover = true,
  visible = true,
  label = "ATTACK",
}: AttackButtonProps) {
  const hoverScale = hover ? "hover:scale-105 transition-transform" : "";
  const borderClasses = "border-2 border-black hover:border-blue-500 transition-colors focus:outline-none focus:ring-0 active:border-transparent"
  const visibilityClass = visible ? "visible" : "invisible";

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={`relative w-32 h-32 p-0 rounded-full overflow-hidden drop-shadow-lg ${hoverScale} ${borderClasses} ${visibilityClass}`}
    >
      {/* Background circle image */}
      <img
        src="src/assets/attack-button-bg.png"
        alt="Attack background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Centered content: glove icon and label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <img
          src="src/assets/attack-button-element.png"
          alt="Attack icon"
          className="w-12 h-12"
        />
        <span className="mt-2 text-xl font-bold text-white uppercase drop-shadow-md">
          {label}
        </span>
      </div>
    </Button>
  );
}
