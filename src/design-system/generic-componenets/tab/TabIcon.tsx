
import { List, Grid } from "lucide-react";
import type { TabIconType } from "./types";


type TabIconProps = {
  iconType?: TabIconType;
};

export const TabIcon = ({ iconType }: TabIconProps) => {
  if (iconType === "list") {
    return <List className="w-4 h-4 mr-1" />;
  }
  if (iconType === "cards") {
    return <Grid className="w-4 h-4 mr-1" />;
  }
  return null;
};