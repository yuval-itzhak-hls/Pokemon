// src/components/LifeBarCard.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import clsx from "clsx";

interface LifeBarCardProps {
  name: string;
  speed: number;
  life: number;
  max: number;
  isActive: boolean;
  className?: string; 
}

export const LifeBarCard = ({
  name,
  speed,
  life,
  max,
  isActive,
  className = "",
}: LifeBarCardProps) => {

  const percent = Math.max(0, Math.min(100, Math.round((life / max) * 100)));

  // Determine indicator color classes
  const getIndicatorClass = () => {
    if (life === 0) return  "bg-gray-600";
    if (percent < 30) return isActive? "bg-error-red" : "bg-error-red/80";
    if (percent < 100) return isActive ? "bg-warning-yellow" : "bg-warning-yellow/80";
    return isActive ?  "bg-success-green" : "bg-success-green/80";
  };
    const faintGradient =
    "linear-gradient(180deg, rgba(247, 91, 91, 0.6) 0%, rgba(221, 113, 80, 0.5) 99.99%, rgba(215, 186, 69, 0.2) 100%)";

  const cardBgClass = life === 0
  ? { background: faintGradient }
  : {};
  
  return (
    <Card
        className={clsx(
          "w-64 h-[100px] border rounded-sm shadow-lg p-0 bg-cover",
          isActive ? "bg-card-active border-white opacity-100 " : "bg-card-disactive border-gray-400 opacity-90",
          className
        )}
        style={cardBgClass}
      >

      <CardHeader className="p-2">
        <CardTitle className="flex justify-between text-heading-lg-bold text-white ">
          <span className="text-xl font-bold">{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1 pt-0">
        <Progress
          className="h-4 bg-gray-800 rounded-sm border border-black"
          value={percent}
          indicatorClassName={`${getIndicatorClass()} rounded-none transition-all`}
        />
      </CardContent>
      <CardFooter className="p-2 pt-0">
        <div className="w-full flex justify-between text-subheading-regular text-white">
          <span>Speed. {speed}</span>
          <span className="text-heading-md-bold">{life > 0 ? `${life}/${max}` : "Fainted"}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
