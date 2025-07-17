
import { MessageCard } from "../messages/MessageCard"; 
import { FightMessage } from "../messages/FightMessage"; 
import { Status } from "../messages/FightMessage";


type FightMessageDisplayProps = {
  status: Status;
  attackerName: string;
  defenderName: string;
};

export const FightMessageDisplay = (props: FightMessageDisplayProps) => {
  const { status, attackerName, defenderName } = props;
  return (
    <div className="absolute top-[9%] left-1/5 transform">
      <MessageCard>
        <FightMessage
          status={status}
          attackerName={attackerName}
          defenderName={defenderName}
        />
      </MessageCard>
    </div>
  );
};