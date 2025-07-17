
export const HealthThresholds = {
  Low: 30, // Below 30% life is low/critical
  Fainted: 0, // 0% life is fainted
} as const;


export const IndicatorColorClasses = {
  Fainted: "bg-gray-600",
  LowActive: "bg-error-red",
  LowInactive: "bg-error-red/80",
  MidActive: "bg-warning-yellow",
  MidInactive: "bg-warning-yellow/80",
  FullActive: "bg-success-green",
  FullInactive: "bg-success-green/80",
} as const;


export const LifeBarTexts = {
  Speed: "Speed.",
  Fainted: "Fainted",
} as const;


export const FaintGradient =
  "linear-gradient(180deg, rgba(247, 91, 91, 0.6) 0%, rgba(221, 113, 80, 0.5) 99.99%, rgba(215, 186, 69, 0.2) 100%)";