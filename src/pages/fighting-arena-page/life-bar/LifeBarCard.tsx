
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import clsx from "clsx";
import {
  HealthThresholds,
  IndicatorColorClasses,
  LifeBarTexts,
  FaintGradient,
} from "./consts"; 


export type LifeBarCardProps = {
  name: string;
  speed: number;
  life: number;
  max: number;
  isActive: boolean;
  className?: string;
};


export const LifeBarCard = (props: LifeBarCardProps) => {
  const { name, speed, life, max, isActive, className = "" } = props;

  // Calculate the percentage of life remaining, clamped between 0 and 100.
  const lifePercentage: number = Math.max(
    0,
    Math.min(100, Math.round((life / max) * 100))
  );


  const getIndicatorClass = (): string => {
    if (lifePercentage === HealthThresholds.Fainted) {
      return IndicatorColorClasses.Fainted;
    }
    if (lifePercentage < HealthThresholds.Low) {
      return isActive
        ? IndicatorColorClasses.LowActive
        : IndicatorColorClasses.LowInactive;
    }
    if (lifePercentage < 100) {
      return isActive
        ? IndicatorColorClasses.MidActive
        : IndicatorColorClasses.MidInactive;
    }
    return isActive
      ? IndicatorColorClasses.FullActive
      : IndicatorColorClasses.FullInactive;
  };

  // Determine the background style for the card when Pokemon is fainted.
  const cardBackgroundStyle =
    lifePercentage === HealthThresholds.Fainted
      ? { background: FaintGradient }
      : {};

      
  return (
    <Card
      className={clsx(
        "w-64 h-[100px] border rounded-sm shadow-lg p-0 bg-cover",
        isActive
          ? "bg-card-active border-white opacity-100"
          : "bg-card-disactive border-gray-400 opacity-90",
        className
      )}
      style={cardBackgroundStyle}
    >
      <CardHeader className="p-2">
        <CardTitle className="flex justify-between text-heading-lg-bold text-white">
          <span className="text-xl font-bold">{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1 pt-0">
        <Progress
          className="h-4 bg-gray-800 rounded-sm border border-black"
          value={lifePercentage}
          indicatorClassName={clsx(
            getIndicatorClass(),
            "rounded-none transition-all"
          )}
        />
      </CardContent>
      <CardFooter className="p-2 pt-0">
        <div className="w-full flex justify-between text-subheading-regular text-white">
          <span>
            {LifeBarTexts.Speed} {speed}
          </span>
          <span className="text-heading-md-bold">
            {life > 0 ? `${life}/${max}` : LifeBarTexts.Fainted}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};