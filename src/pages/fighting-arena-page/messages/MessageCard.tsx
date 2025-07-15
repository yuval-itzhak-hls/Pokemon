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


