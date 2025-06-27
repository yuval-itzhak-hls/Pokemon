// src/components/LifeBarCard.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LifeBarCardProps {
  name: string;
  speed: number;
  life: number;
  max: number;
  isActive: boolean;
  className?: string; 
}

export const LifeBarCard: React.FC<LifeBarCardProps> = ({
  name,
  speed,
  life,
  max,
  isActive,
  className = "",
}) => {
  const percent = Math.max(0, Math.min(100, Math.round((life / max) * 100)));

  // Determine indicator color classes
  const getIndicatorClass = () => {
    if (life === 0) return "bg-gray-600";
    if (percent < 30) return "bg-red-600";
    if (percent < 100) return "bg-yellow-400";
    return "bg-green-400";
  };
  
  const faintGradient =
    "linear-gradient(180deg, rgba(247, 91, 91, 0.5) 0%, rgba(221, 113, 80, 0.5) 99.99%, rgba(215, 186, 69, 0.2) 100%)";

  const cardBgClass = life === 0
  ? { background: faintGradient }
  : {};

  return (
    <Card
      className={`w-64 h-[103px] ${life !== 0 ? "bg-gradient-to-br from-teal-300 to-green-300" : ""} border-white border rounded-sm shadow-lg p-0 ${
        isActive ? "opacity-100" : "opacity-50"
      } ${className}`}
      style={cardBgClass}
    >
      <CardHeader className="p-2 ">
        <CardTitle className="flex justify-between text-heading-lg-bold text-white ">
          <span className="text-xl font-bold">{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <Progress
          className="h-3 bg-gray-800 rounded-sm border border-black"
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
