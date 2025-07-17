// src/components/MessageCard.tsx
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type MessageCardProps = {
  children: ReactNode;
  className?: string;
}

export const MessageCard = ({
  children,
  className = "",
}:MessageCardProps) => {
  return (     
    <div
    className="
      rounded-tr-lg rounded-br-lg          
      bg-gradient-to-r                     
      from-[#50fefc]/40                       
      to-[#62E345]/40                        
      p-[5px]   
      bg-white/30                           
      inline-block                        
    "
  >
    <div
      className="
        w-[560px] h-[100px]
        bg-white/70                      
        rounded-tr-lg rounded-br-lg         
        flex items-center
        px-[25px] py-[24px]
      "
    >
      {children}
     </div>
    </div>
);}


