import { IconName } from "@fortawesome/fontawesome-svg-core";

export const PUSHER_APP_KEY = "5e3e807338568cf72295";
export const PUSHER_APP_CLUSTER = "ap3";

export const bottomTabs: BottomTabsProps[] = [
  {
    label: "홈",
    value: "/home",
    name: "house",
  },
  {
    label: "둘러보기",
    value: "/explore",
    name: "bars",
  },
  {
    label: "업로드",
    value: "/upload",
    name: "plus",
  },
  {
    label: "즐겨찾기",
    value: "/favorite",
    name: "heart",
  },
  {
    label: "마이카붐",
    value: "/account",
    name: "user",
  },
];

export type BottomTabsProps = {
  value: string;
  name: IconName;
  label: string;
};
