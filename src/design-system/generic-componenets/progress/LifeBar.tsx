import { Progress } from "@/components/ui/progress";
import clsx from "clsx";

interface LifeBarProps {
  percent: number;     
  className?: string;   
  thresholds?: { green: number; yellow: number };
}

export function LifeBar({
  percent,
  className,
  thresholds = { green: 70, yellow: 30 },
}: LifeBarProps) {

  const pct = Math.max(0, Math.min(100, percent));

  const barColor =
    pct >= thresholds.green
      ? "bg-success-green"  
      : pct >= thresholds.yellow
      ? "bg-warning-yellow" 
      : "bg-error-red";     

  return (
    <div className={clsx("w-full", className)}>
      <Progress
        value={pct}
        className={clsx(
          "h-3 rounded-full bg-neutral-700", 
        )}
        indicatorClassName={clsx(
          "rounded-full transition-all duration-300",
          barColor
        )}
      />
    </div>
  );
}
