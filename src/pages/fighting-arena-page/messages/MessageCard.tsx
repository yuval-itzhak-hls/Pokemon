// src/components/MessageCard.tsx
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MessageCardProps {
  children: ReactNode;
  className?: string;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  children,
  className = "",
}) => {
  return (     
    <div
      className="
        w-[560px] h-[100px]
        bg-white/50
        border-t-[5px] border-r-[5px] border-b-[5px] border-l-0
      border-[rgba(242,245,247,0.5)]         
        rounded-tr-lg rounded-br-lg
        flex items-center
        px-[25px] py-[24px]
      "
    >
      {children}
    </div>
);}


