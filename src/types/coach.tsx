import { amber, indigo, purple, red } from "@mui/material/colors";
import { coachs } from "../constants/coach";

export type CoachProps = {
  id: number;
  type: string;
  icon: string;
  name: string;
  position: string;
  profile: string;
  animations: string[];
  background_color: string;
  desc: string;
  benefit: React.ReactNode;
  like: React.ReactNode;
  likes: string[];
  dislikes: string[];
  promotion: React.ReactNode;
};
export const coachsDefaultProps = coachs;
